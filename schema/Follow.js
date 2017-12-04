const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Follow = sequelize.define('follows', {
  //is userId that has this data
  ownerId: {
    type: Sequelize.STRING
  },
  //is userId that followed by this ownerId
  followedId: {
    type: Sequelize.STRING
  }
});

module.exports = Follow;
