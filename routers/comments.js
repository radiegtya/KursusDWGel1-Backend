const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Comment = require('../schema/Comment');
const User = require('../schema/User');

router.get('/comments/:postId', function(req, res){
  Comment.findAll({
    include: [
      {model: User}
    ],
    where: {
      postId: req.params.postId
    }
  }).then(function(comments){
    res.send(comments)
  });
});

router.post('/comments', function(req, res){
  Comment.create(req.body).then(function(comment){
    res.send(comment);
  })
});

module.exports = router;
