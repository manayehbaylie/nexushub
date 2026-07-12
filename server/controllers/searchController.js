const members = require('../models/Member');
const requests = require('../models/Request');
const resources = require('../models/Resource');

const search = async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.json([]);

    const [memberMatches, requestMatches, resourceMatches] = await Promise.all([
      members.findAll({ search: q, limit: 5 }),
      requests.findAll({ search: q, limit: 5 }),
      resources.findAll({ search: q, limit: 5 }),
    ]);

    const results = [
      ...memberMatches.map((member) => ({
        type: 'Team Member',
        title: member.name || member.member_id || 'Member',
        description: member.email || member.phone || member.department || 'Member profile',
        id: member.id,
        path: `/members/${member.id}`,
      })),
      ...requestMatches.map((request) => ({
        type: 'Request',
        title: request.title || request.request_number || 'Request',
        description: `${request.request_number || 'Request'} • ${request.status || 'pending'}`,
        id: request.id,
        path: `/requests/${request.id}`,
      })),
      ...resourceMatches.map((resource) => ({
        type: 'Resource',
        title: resource.name || resource.resource_code || 'Resource',
        description: `${resource.resource_code || 'Resource'} • ${resource.category || 'General'}`,
        id: resource.id,
        path: `/resources/${resource.id}`,
      })),
    ];

    return res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
