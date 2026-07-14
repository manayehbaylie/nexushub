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
    res.status(200).json({
      members: 0,
      requests: 0,
      resources: 0,
      activities: [],
      completedRequests: 0,
      pendingRequests: 0,
      inProgressRequests: 0,
      availableResources: 0,
      inUseResources: 0,
      activeMembers: 0,
      membersByDepartment: [],
      requestsByStatus: [],
      resourcesByCategory: [],
      message: 'Dashboard summary temporarily unavailable',
    });
  }
};

module.exports = { getSummary };