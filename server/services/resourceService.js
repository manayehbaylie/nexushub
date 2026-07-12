const Resource = require('../models/Resource');

const getAll = async (filters = {}) => {
  try {
    return await Resource.findAll(filters);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await Resource.findById(id);
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  try {
    // Check if resource_code already exists
    const existing = await Resource.findByCode(payload.resource_code);
    if (existing) throw new Error('Resource code already exists');
    return await Resource.create(payload);
  } catch (error) {
    throw error;
  }
};

const update = async (id, payload) => {
  try {
    return await Resource.update(id, payload);
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    return await Resource.delete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
