const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Post = require('./Post');
const User = require('./User');

const Follow = sequelize.define('follows', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  activity: {
    type: Sequelize.STRING
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

Follow.belongsTo(Post, {foreignKey: 'postId', targetKey: 'id'});
Follow.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
Post.hasMany(Follow, {foreignKey: 'postId', sourceKey: 'id'});

module.exports = Follow;
