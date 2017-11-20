const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Post = sequelize.define('posts', {
  userId: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  likeCount: {
    type: Sequelize.INTEGER
  },
  commentCount: {
    type: Sequelize.INTEGER
  },
});

Post.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

module.exports = Post;
