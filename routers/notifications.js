const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Notification = require('../schema/Notification');
const User = require('../schema/User');

router.get('/notifications', function(req, res){
  Notification.findAll({
    include: [
      {model: User}
    ]
  }).then(function(notifications){
    res.send(notifications)
  });
});

router.post('/notifications', function(req, res){
  Notification.create(req.body).then(function(notification){
    res.send(notification);
  })
});

module.exports = router;
