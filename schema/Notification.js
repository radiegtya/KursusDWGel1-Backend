const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Post = require('./Post');
const User = require('./User');

const Notification = sequelize.define('notifications', {
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

Notification.belongsTo(Post, {foreignKey: 'postId', targetKey: 'id'});
Notification.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
Post.hasMany(Notification, {foreignKey: 'postId', sourceKey: 'id'});

module.exports = Notification;
