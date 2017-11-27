const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Post = require('./Post');
const User = require('./User');

const Comment = sequelize.define('comments', {
  userId: {
    type: Sequelize.INTEGER
  },
  text: {
    type: Sequelize.STRING
  },
  postId: {
    type: Sequelize.INTEGER
  }
});

Comment.belongsTo(Post, {foreignKey: 'postId', targetKey: 'id'});
Comment.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

module.exports = Comment;
