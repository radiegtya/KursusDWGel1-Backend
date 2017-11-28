const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
// const Comment = require('./Comment');

const Post = sequelize.define('posts', {
  userId: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  text: {
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
// Post.hasMany(Comment, {foreignKey: 'postId', sourceKey: 'id'});

module.exports = Post;
