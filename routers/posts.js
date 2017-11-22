const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const Post = require('../schema/Post');
const User = require('../schema/User');

router.get('/posts', function(req, res){
  Post.findAll({
    include: [
      {model: User}
    ],
    order: [
      ["id", 'DESC']
    ]
  }).then(function(posts){
    res.send(posts)
  })
});

router.post('/posts', upload.single('photo'), function(req, res){
  console.log(req.file);

  // Post.create(req.body).then(function(post){
  //   res.send(post);
  // })
});

module.exports = router;
