require('dotenv').config();

module.exports = {
  env: {
    mongodburl: process.env.MONGODB_URI,
  },
};
