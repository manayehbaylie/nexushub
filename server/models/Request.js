const pool = require('../config/db');

const Request = {
  async findAll(filters = {}) {
    try {
      let query = 'SELECT r.*, m.name as assigned_to_name FROM requests r LEFT JOIN members m ON r.assigned_to = m.id WHERE 1=1';
      const values = [];
      let paramCount = 1;

      if (filters.search) {
        query += ` AND (r.request_number ILIKE $${paramCount} OR r.title ILIKE $${paramCount + 1} OR COALESCE(m.name, '') ILIKE $${paramCount + 2})`;
        values.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
        paramCount += 3;
      }

      if (filters.status) {
        query += ` AND r.status = $${paramCount}`;
        values.push(filters.status);
        paramCount++;
      }

      if (filters.priority) {
        query += ` AND r.priority = $${paramCount}`;
        values.push(filters.priority);
        paramCount++;
      }

      query += ' ORDER BY r.created_at DESC';

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
      const result = await pool.query('SELECT r.*, m.name as assigned_to_name FROM requests r LEFT JOIN members m ON r.assigned_to = m.id WHERE r.id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const result = await pool.query(
        `INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [data.request_number, data.title, data.description, data.priority || 'medium', data.status || 'pending', data.assigned_to || null, data.created_by, data.due_date]
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
      let query = 'UPDATE requests SET ';
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
      const result = await pool.query('DELETE FROM requests WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Request;
