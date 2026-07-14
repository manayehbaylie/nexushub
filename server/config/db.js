const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });
dotenv.config({ path: path.join(__dirname, '..', 'server.env'), override: true });

const createPoolConfig = () => {
  const hasExplicitDbSettings = Boolean(process.env.DB_HOST || process.env.DB_PORT || process.env.DB_USER || process.env.DB_PASSWORD || process.env.DB_NAME);

  if (hasExplicitDbSettings) {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'nexushub',
    };
  }

  if (process.env.DATABASE_URL) {
    try {
      const parsedUrl = new URL(process.env.DATABASE_URL);
      return {
        host: parsedUrl.hostname || 'localhost',
        port: Number(parsedUrl.port || 5432),
        user: decodeURIComponent(parsedUrl.username || 'postgres'),
        password: decodeURIComponent(parsedUrl.password || 'postgres'),
        database: (parsedUrl.pathname || '').replace(/^\/+/, '') || 'postgres',
      };
    } catch (error) {
      console.warn('Invalid DATABASE_URL, falling back to defaults:', error.message);
    }
  }

  return {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'nexushub',
  };
};

const pool = new Pool(createPoolConfig());

const initDatabase = async () => {
  const client = await pool.connect();
  try {
    const requiredTables = ['users', 'members', 'requests', 'resources', 'activities'];
    const tableCheckResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY($1)
    `, [requiredTables]);

    const existingTables = new Set(tableCheckResult.rows.map((row) => row.table_name));
    const missingTables = requiredTables.filter((tableName) => !existingTables.has(tableName));

    if (missingTables.length > 0) {
      console.log(`Initializing database schema and seed data (missing tables: ${missingTables.join(', ')})...`);
      const schemaSql = fs.readFileSync(path.join(__dirname, '..', 'database', 'schema.sql'), 'utf8');
      const seedSql = fs.readFileSync(path.join(__dirname, '..', 'database', 'seed.sql'), 'utf8');

      await client.query('BEGIN');
      try {
        await client.query(schemaSql);
        await client.query(seedSql);
        await client.query('COMMIT');
        console.log('✅ Database schema and seed data loaded');
      } catch (initErr) {
        await client.query('ROLLBACK');
        throw initErr;
      }
    } else {
      console.log('✅ Database already initialized');
    }
  } catch (err) {
    console.error('❌ Database initialization error:', err);
    throw err;
  } finally {
    client.release();
  }
};

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

pool.connect()
  .then(async () => {
    console.log('✅ PostgreSQL Connected');
    await initDatabase();
  })
  .catch((err) => console.error('❌ Database Connection Error:', err));

module.exports = pool;








