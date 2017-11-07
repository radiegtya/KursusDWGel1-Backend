const express = require('express');
const bodyParser = require('body-parser');

const routers = require('./routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api', routers);

app.listen('5000', function(){
  console.log('app listen on port 5000');
});
