const pool = require('../config/db');

const User = {
  // Get user by username
  async findByUsername(username) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  async findById(id) {
    try {
      const result = await pool.query('SELECT id, username, email, name, role, status, created_at FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get user by email
  async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Create user
  async create(username, email, passwordHash, name, role = 'user') {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, name, role, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, name, role, status',
        [username, email, passwordHash, name, role, 'active']
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update user
  async update(id, updates) {
    try {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      let query = 'UPDATE users SET ';
      query += fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      query += `, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING id, username, email, name, role, status, updated_at`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  async findAll() {
    try {
      const result = await pool.query('SELECT id, username, email, name, role, status, created_at FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;
