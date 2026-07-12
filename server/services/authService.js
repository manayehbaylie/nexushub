const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/jwt');

const authenticate = async (username, password) => {
  try {
    const user = await User.findByUsername(username);

    console.log("Username:", username);
    console.log("User from DB:", user);

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password_hash);

    console.log("Password valid:", valid);

    if (!valid) return null;

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      secret,
      { expiresIn }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email
      },
      token
    };

  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
};

const createUser = async (username, email, password, name, role = 'user') => {
  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) throw new Error('Username already exists');
    
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) throw new Error('Email already exists');
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create(username, email, passwordHash, name, role);
    
    return { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role };
  } catch (error) {
    throw error;
  }
};

module.exports = { authenticate, verifyToken, createUser };
