const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../schema/Post');
const User = require('../schema/User');

router.get('/posts', function(req, res){
  Post.findAll({
    include: [
      {model: User}
    ]
  }).then(function(posts){
    res.send(posts)
  })
});

module.exports = router;
