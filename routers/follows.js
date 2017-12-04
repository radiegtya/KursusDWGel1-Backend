const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Follow = require('../schema/Follow');

// router.get('/follows', function(req, res){
//   Follow.findAll({
//     include: [
//       {model: User}
//     ]
//   }).then(function(follows){
//     res.send(follows)
//   });
// });

router.get('/follows/:ownerId/:followedId', function(req, res){
  Follow.findOne({
    where: {
      ownerId: req.params.ownerId,
      followedId: req.params.followedId,
    }
  }).then(function(follow){
    res.send(follow);
  })
})

router.post('/follows', function(req, res){
  Follow.create(req.body).then(function(follow){
    res.send(follow);
  })
});

router.delete('/follows/:ownerId/:followedId', function(req, res){
  Follow.destroy({
    where: {
      ownerId: req.params.ownerId,
      followedId: req.params.followedId,
    }
  }).then(function(){
    res.send('follow deleted')
  })
})

module.exports = router;
