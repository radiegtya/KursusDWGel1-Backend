const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var multer  = require('multer');

const User = require('../schema/User');


//middleware authentication
var authenticate = function(req, res, next) {
 var token = req.body.token || req.headers["x-access-token"];
  if (token) {
   jwt.verify(token, 'secretwife', function(err, decoded) {
      if (err) {
         console.error("JWT Verification Error", err);
         return res.status(403).send(err);
      } else {
         req.decoded = decoded;
         return next();
      }
   });
  } else {
   res.status(403).send("Token not provided");
  }
}

function createToken(user){
  const myToken = jwt.sign(
    { user: user.id },
    'secretwife',
    { expiresIn: 24 * 60 * 60 }
  );

  return myToken;
}

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

router.get('/users', authenticate, function(req, res){
  User.findAll().then(function(users){
    res.send(users)
  });
});

router.get('/users/:id', function(req, res){
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(user){
    res.send(user);
  })
})

router.post('/users', function(req, res){
  User.create(req.body).then(function(user){
    res.send(user);
  })
})

router.delete('/users/:id', function(req, res){
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.send('user deleted')
  })
})

router.patch('/users/:id', upload.single('profilePicture'), function(req, res){
  const fullUrl = req.protocol + '://' + req.get('host');
  let body = req.body;
  body.profilePicture = fullUrl + "/" + req.file.path;

  User.update(body, {
    where: {
      id: req.params.id
    }
  }).then(function(user){
    res.send(user)
  })
})

router.post('/signup', function(req, res){
  User.findOne({
    where: {username: req.body.username}
  }).then(function(user){
    if(!user){
      User.create(req.body).then(function(user){
        res.send(
          200,
          {
            'token': createToken(user),
            'userId': user.id,
            'username': user.username
          }
        );
      })
    }else{
      res.send("User Already Exists");
    }
  })
  .catch(function (err) {
    res.send('Error creating user: ', err.message);
  });
}); 

router.post('/signin', function(req, res){
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user){
    if(user){
      res.send(
        200,
        {
          'token': createToken(user),
          'userId': user.id,
          'username': user.username
        }
      );
    }else{
      res.send('Wrong username or password')
    }
  })
});

module.exports = router;
