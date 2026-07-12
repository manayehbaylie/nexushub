const dashboardService = require('../services/dashboardService');

const getSummary = async (req, res) => {
  try {
    const result = await dashboardService.getSummary();
    const { summary, membersByDepartment, requestsByStatus, resourcesByCategory, recentActivities } = result;

    res.json({
      members: summary.totalMembers,
      requests: summary.totalRequests,
      resources: summary.totalResources,
      activities: recentActivities,
      completedRequests: summary.completedRequests,
      pendingRequests: summary.pendingRequests,
      inProgressRequests: summary.inProgressRequests,
      availableResources: summary.availableResources,
      inUseResources: summary.inUseResources,
      activeMembers: summary.activeMembers,
      membersByDepartment,
      requestsByStatus,
      resourcesByCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch dashboard summary' });
  }
};

module.exports = { getSummary };
