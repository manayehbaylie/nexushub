const requestService = require('../services/requestService');

const getAll = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      status: req.query.status,
      priority: req.query.priority,
    };
    const requests = await requestService.getAll(filters);
    return res.json(requests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch requests' });
  }
};

const getById = async (req, res) => {
  try {
    const item = await requestService.getById(req.params.id);
    return item ? res.json(item) : res.status(404).json({ message: 'Request not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch request' });
  }
};

const create = async (req, res) => {
  try {
    const item = await requestService.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to create request' });
  }
};

const update = async (req, res) => {
  try {
    const item = await requestService.update(req.params.id, req.body);
    return item ? res.json(item) : res.status(404).json({ message: 'Request not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to update request' });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await requestService.remove(req.params.id);
    return deleted ? res.json({ message: 'Request removed' }) : res.status(404).json({ message: 'Request not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete request' });
  }
};
module.exports = { getAll, getById, create, update, remove };
