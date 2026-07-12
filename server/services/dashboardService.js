const Member = require('../models/Member');
const Request = require('../models/Request');
const Resource = require('../models/Resource');
const Activity = require('../models/Activity');
const pool = require('../config/db');

const getSummary = async () => {
  try {
    const members = await Member.findAll();
    const requests = await Request.findAll();
    const resources = await Resource.findAll();
    const activities = await Activity.findAll({ limit: 10 });

    const requestStats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress
      FROM requests
    `);

    const resourceStats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'available' THEN 1 END) as available,
        COUNT(CASE WHEN status = 'in_use' THEN 1 END) as in_use
      FROM resources
    `);

    const activeMembers = await pool.query(`
      SELECT COUNT(*) as count FROM members WHERE status = 'active'
    `);

    const membersByDept = await pool.query(`
      SELECT department AS name, COUNT(*) as count
      FROM members
      GROUP BY department
      ORDER BY count DESC
    `);

    const requestsByStatus = await pool.query(`
      SELECT status AS name, COUNT(*) as count
      FROM requests
      GROUP BY status
      ORDER BY count DESC
    `);

    const resourcesByCategory = await pool.query(`
      SELECT category AS name, COUNT(*) as count
      FROM resources
      GROUP BY category
      ORDER BY count DESC
    `);

    const stats = requestStats.rows[0] || { total: 0, completed: 0, pending: 0, in_progress: 0 };
    const rStats = resourceStats.rows[0] || { total: 0, available: 0, in_use: 0 };
    const activeCount = activeMembers.rows[0] || { count: 0 };

    return {
      summary: {
        totalMembers: members.length,
        totalRequests: stats.total,
        totalResources: rStats.total,
        completedRequests: stats.completed,
        pendingRequests: stats.pending,
        inProgressRequests: stats.in_progress,
        availableResources: rStats.available,
        inUseResources: rStats.in_use,
        activeMembers: parseInt(activeCount.count || 0, 10),
      },
      membersByDepartment: membersByDept.rows.map((row) => ({ name: row.name, count: parseInt(row.count, 10) })),
      requestsByStatus: requestsByStatus.rows.map((row) => ({ name: row.name, count: parseInt(row.count, 10) })),
      resourcesByCategory: resourcesByCategory.rows.map((row) => ({ name: row.name, count: parseInt(row.count, 10) })),
      recentActivities: activities,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { getSummary };
