const pool = require('../config/db');

const Member = {
  // Get all members
  async findAll(filters = {}) {
    try {
      let query = 'SELECT * FROM members WHERE 1=1';
      const values = [];
      let paramCount = 1;

      if (filters.department) {
        query += ` AND department = $${paramCount}`;
        values.push(filters.department);
        paramCount++;
      }

      if (filters.status) {
        query += ` AND status = $${paramCount}`;
        values.push(filters.status);
        paramCount++;
      }

      if (filters.search) {
        query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR member_id ILIKE $${paramCount})`;
        values.push(`%${filters.search}%`);
        paramCount++;
      }

      query += ' ORDER BY created_at DESC';

      if (filters.limit) {
        query += ` LIMIT $${paramCount}`;
        values.push(filters.limit);
        paramCount++;
      }

      if (filters.offset) {
        query += ` OFFSET $${paramCount}`;
        values.push(filters.offset);
      }

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get total count
  async count(filters = {}) {
    try {
      let query = 'SELECT COUNT(*) FROM members WHERE 1=1';
      const values = [];
      let paramCount = 1;

      if (filters.department) {
        query += ` AND department = $${paramCount}`;
        values.push(filters.department);
        paramCount++;
      }

      if (filters.status) {
        query += ` AND status = $${paramCount}`;
        values.push(filters.status);
        paramCount++;
      }

      if (filters.search) {
        query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
        values.push(`%${filters.search}%`);
      }

      const result = await pool.query(query, values);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw error;
    }
  },

  // Get member by ID
  async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get member by email
  async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM members WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get member by member_id
  async findByMemberId(memberId) {
    try {
      const result = await pool.query('SELECT * FROM members WHERE member_id = $1', [memberId]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Create member
  async create(data) {
    try {
      const result = await pool.query(
        `INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *`,
        [data.member_id, data.name, data.email, data.phone, data.department, data.position, data.status || 'active', data.hire_date]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update member
  async update(id, updates) {
    try {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      let query = 'UPDATE members SET ';
      query += fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      query += `, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete member
  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get active members count
  async getActiveCount() {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM members WHERE status = $1', ['active']);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw error;
    }
  },

  // Get members by department
  async getByDepartment(department) {
    try {
      const result = await pool.query('SELECT * FROM members WHERE department = $1 ORDER BY name', [department]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Member;
