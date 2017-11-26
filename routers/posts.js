const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var multer  = require('multer');

const sequelize = require('../sequelize');
const Post = require('../schema/Post');
const User = require('../schema/User');


//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage});

router.get('/posts', function(req, res){
  const include = [
    {model: User}
  ];

  const order = [
    ["id", 'DESC']
  ];

  if(req.query && req.query.userId){
    const userId = req.query.userId;

    Post.findAll({
      include: include,
      order: order,
      where: {
        userId: userId
      }
    }).then(function(posts){
      res.send(posts)
    })
  }else{
    Post.findAll({
      include: include,
      order: order
    }).then(function(posts){
      res.send(posts)
    })
  }

});

router.get('/posts/count/:userId', function(req, res){
  const userId = req.params.userId;

  Post.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
    where: {
      userId: userId
    }
  }).then(function(result){
    res.send(result);
  })
});

router.post('/posts', upload.single('photo'), function(req, res){
  const fullUrl = req.protocol + '://' + req.get('host');
  let body = req.body;
  body.imageUrl = fullUrl + "/" + req.file.path;

  Post.create(body).then(function(post){
    res.send(post);
  })
});

module.exports = router;
