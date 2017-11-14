const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('kursus-dw-1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
});

//middleware authorize
var authorize = function(req, res, next) {
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

router.get('/users', authorize, function(req, res){
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

router.patch('/users/:id', function(req, res){
  User.update(req.body, {
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
        const myToken = jwt.sign(
          { user: user.id },
          'secretwife',
          { expiresIn: 24 * 60 * 60 }
        );
        res.send(
          200,
          {
            'token': myToken,
            'userId': user.id,
            'username': user.username
          }
        );
      })
    }
  })
  .catch(function (err) {
    res.send('Error creating user: ', err.message);
  });
}); 

module.exports = router;
