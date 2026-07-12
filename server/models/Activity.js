const pool = require('../config/db');

const Activity = {
  async findAll(filters = {}) {
    try {
      let query = 'SELECT a.*, u.username FROM activities a LEFT JOIN users u ON a.user_id = u.id ORDER BY a.created_at DESC LIMIT 50';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const result = await pool.query(
        `INSERT INTO activities (user_id, action, description, entity_type, entity_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [data.user_id || null, data.action, data.description || null, data.entity_type || null, data.entity_id || null]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Activity;
