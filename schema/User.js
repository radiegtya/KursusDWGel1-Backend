const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  profilePicture: {
    type: Sequelize.STRING
  }
});

module.exports = User;
