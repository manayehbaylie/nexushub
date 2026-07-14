const pool = require('./config/db');
pool.query('SELECT username, password_hash FROM users WHERE username = $1', ['admin'])
  .then((result) => {
    console.log(JSON.stringify(result.rows, null, 2));
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
