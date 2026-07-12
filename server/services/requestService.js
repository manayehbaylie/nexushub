const Request = require('../models/Request');

const getAll = async (filters = {}) => {
  try {
    return await Request.findAll(filters);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await Request.findById(id);
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  try {
    return await Request.create(payload);
  } catch (error) {
    throw error;
  }
};

const update = async (id, payload) => {
  try {
    return await Request.update(id, payload);
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    return await Request.delete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
