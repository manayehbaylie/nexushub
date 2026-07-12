const dashboardService = require('../services/dashboardService');

const getStatistics = async (req, res) => {
  try {
    const result = await dashboardService.getSummary();
    const { summary, recentActivities, membersByDepartment } = result;

    const memberStats = await require('../config/db').query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'active') AS active_members,
        COUNT(*) FILTER (WHERE status != 'active') AS inactive_members
      FROM members
    `);

    const requestStatusStats = await require('../config/db').query(`
      SELECT status, COUNT(*)::int AS count
      FROM requests
      GROUP BY status
      ORDER BY count DESC
    `);

    const resourceCategoryStats = await require('../config/db').query(`
      SELECT category, COUNT(*)::int AS count
      FROM resources
      GROUP BY category
      ORDER BY count DESC
    `);

    const memberStatus = memberStats.rows[0] || { active_members: 0, inactive_members: 0 };

    res.json({
      members: summary.totalMembers,
      requests: summary.totalRequests,
      resources: summary.totalResources,
      activities: recentActivities.length,
      membersByDepartment: membersByDepartment || [],
      requestsByStatus: requestStatusStats.rows || [],
      resourcesByCategory: resourceCategoryStats.rows || [],
      memberStatus: {
        active: Number(memberStatus.active_members || 0),
        inactive: Number(memberStatus.inactive_members || 0),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};

module.exports = { getStatistics };
