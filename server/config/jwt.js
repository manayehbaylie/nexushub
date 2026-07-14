const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });
dotenv.config({ path: path.join(__dirname, '..', 'server.env'), override: true });

module.exports = {
  secret: process.env.JWT_SECRET || 'change-me',
  expiresIn: '8h',
};
