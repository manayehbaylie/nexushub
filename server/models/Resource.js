const pool = require('../config/db');

const Resource = {
  async findAll(filters = {}) {
    try {
      let query = 'SELECT * FROM resources WHERE 1=1';
      const values = [];
      let paramCount = 1;

      if (filters.search) {
        query += ` AND (name ILIKE $${paramCount} OR resource_code ILIKE $${paramCount + 1})`;
        values.push(`%${filters.search}%`, `%${filters.search}%`);
        paramCount += 2;
      }

      if (filters.category) {
        query += ` AND category ILIKE $${paramCount}`;
        values.push(filters.category);
        paramCount++;
      }

      if (filters.status) {
        query += ` AND status ILIKE $${paramCount}`;
        values.push(filters.status);
        paramCount++;
      }

      query += ' ORDER BY created_at DESC';

      if (filters.limit) {
        query += ` LIMIT $${paramCount}`;
        values.push(filters.limit);
      }

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM resources WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  async findByCode(code) {
    try {
      const result = await pool.query('SELECT * FROM resources WHERE resource_code = $1', [code]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const result = await pool.query(
        `INSERT INTO resources (resource_code, name, category, description, status, quantity, location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [data.resource_code, data.name, data.category, data.description, data.status || 'available', data.quantity || 1, data.location]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      let query = 'UPDATE resources SET ';
      query += fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      query += `, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;
      values.push(id);
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM resources WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Resource;
