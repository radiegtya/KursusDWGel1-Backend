const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./sequelize');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//connect to mysql
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api', require('./routers/users'));
app.use('/api', require('./routers/posts'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen('5000', function(){
  console.log('app listen on port 5000');
});
