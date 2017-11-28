const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Follow = require('../schema/Follow');
const User = require('../schema/User');

router.get('/follows', function(req, res){
  Follow.findAll({
    include: [
      {model: User}
    ]
  }).then(function(follows){
    res.send(follows)
  });
});

router.post('/follows', function(req, res){
  Follow.create(req.body).then(function(follow){
    res.send(follow);
  })
});

module.exports = router;
