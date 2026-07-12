const memberService = require('../services/memberService');

const getAll = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      department: req.query.department,
      status: req.query.status,
    };
    const members = await memberService.getAll(filters);
    return res.json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch members' });
  }
};

const getById = async (req, res) => {
  try {
    const member = await memberService.getById(req.params.id);
    return member ? res.json(member) : res.status(404).json({ message: 'Member not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch member' });
  }
};

const create = async (req, res) => {
  try {
    const member = await memberService.create(req.body);
    return res.status(201).json(member);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to create member' });
  }
};

const update = async (req, res) => {
  try {
    const member = await memberService.update(req.params.id, req.body);
    return member ? res.json(member) : res.status(404).json({ message: 'Member not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to update member' });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await memberService.remove(req.params.id);
    return deleted ? res.json({ message: 'Member removed' }) : res.status(404).json({ message: 'Member not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete member' });
  }
};
module.exports = { getAll, getById, create, update, remove };
