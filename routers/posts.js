const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var multer  = require('multer');
const Sequelize = require('sequelize');

const sequelize = require('../sequelize');
const Post = require('../schema/Post');
const User = require('../schema/User');
const Comment = require('../schema/Comment');
const Follow = require('../schema/Follow');


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
  const Op = Sequelize.Op;

  const include = [
    {model: User},
    {
      model: Comment,
      limit: 2,
      include: [{model: User}]
    }
  ];

  const order = [
    ["id", 'DESC']
  ];

  if(req.query){


    const userId = req.query.userId;
    const text = req.query.text;
    let where = {};
    if(userId)
      where.userId = userId;
    if(text){
      where.text = {
        [Op.like]: '%'+ text + '%',
      }
    }

    Post.findAll({
      include: include,
      order: order,
      where: where
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

router.get('/posts/followed/:ownerId', function(req, res){
  const Op = Sequelize.Op;

  //get array list of followedId
  Follow.findAll({
    where: {
      ownerId: req.params.ownerId
    }
  }).then(function(follows){
    let followedIds = [];
    let i = 0;
    follows.forEach(function(follow){
      followedIds[i] = follow.followedId;
      i++;
    });

    //get all posts by userId in followedIds
    Post.findAll({
      where: {
        userId: {
          [Op.in]: followedIds
        }
      },
      include: [
        {model: User},
        {
          model: Comment,
          limit: 2,
          include: [{model: User}]
        }
      ]
    }).then(function(posts){
      res.send(posts)
    })
  });
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

router.patch('/posts/:id', function(req, res){
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function(post){
    res.send(post)
  })
})

module.exports = router;
