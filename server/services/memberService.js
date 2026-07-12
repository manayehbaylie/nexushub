const Member = require('../models/Member');
const Activity = require('../models/Activity');

const getAll = async (filters = {}) => {
  try {
    return await Member.findAll(filters);
  } catch (error) {
    throw error;
  }
};

const getCount = async (filters = {}) => {
  try {
    return await Member.count(filters);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await Member.findById(id);
  } catch (error) {
    throw error;
  }
};

const getByEmail = async (email) => {
  try {
    return await Member.findByEmail(email);
  } catch (error) {
    throw error;
  }
};

const getByMemberId = async (memberId) => {
  try {
    return await Member.findByMemberId(memberId);
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  try {
    // Check if member_id already exists
    const existing = await Member.findByMemberId(payload.member_id);
    if (existing) throw new Error('Member ID already exists');
    
    // Check if email already exists
    const emailExists = await Member.findByEmail(payload.email);
    if (emailExists) throw new Error('Email already exists');
    
    return await Member.create(payload);
  } catch (error) {
    throw error;
  }
};

const update = async (id, payload) => {
  try {
    // Check if email is being changed and if it already exists
    if (payload.email) {
      const existing = await Member.findByEmail(payload.email);
      if (existing && existing.id !== parseInt(id)) {
        throw new Error('Email already exists');
      }
    }
    
    return await Member.update(id, payload);
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    return await Member.delete(id);
  } catch (error) {
    throw error;
  }
};

const getActiveCount = async () => {
  try {
    return await Member.getActiveCount();
  } catch (error) {
    throw error;
  }
};

const getByDepartment = async (department) => {
  try {
    return await Member.getByDepartment(department);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, getCount, getById, getByEmail, getByMemberId, create, update, remove, getActiveCount, getByDepartment };
