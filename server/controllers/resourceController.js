const resourceService = require('../services/resourceService');

const getAll = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      status: req.query.status,
    };
    const resources = await resourceService.getAll(filters);
    return res.json(resources);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

const getById = async (req, res) => {
  try {
    const item = await resourceService.getById(req.params.id);
    return item ? res.json(item) : res.status(404).json({ message: 'Resource not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch resource' });
  }
};

const create = async (req, res) => {
  try {
    const item = await resourceService.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to create resource' });
  }
};

const update = async (req, res) => {
  try {
    const item = await resourceService.update(req.params.id, req.body);
    return item ? res.json(item) : res.status(404).json({ message: 'Resource not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to update resource' });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await resourceService.remove(req.params.id);
    return deleted ? res.json({ message: 'Resource removed' }) : res.status(404).json({ message: 'Resource not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete resource' });
  }
};
module.exports = { getAll, getById, create, update, remove };
