const express = require('express');
const router = express.Router();

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

router.get('/users', function(req, res){
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

module.exports = router;
