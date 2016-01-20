'use strict';

require('dotenv').load();

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');

const jwt    = require('jsonwebtoken');
const config = require('./config');
const User   = require('./server/models/user');

const port = (process.env.PORT || 8080);
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/setup', (req, res) => {
  let adam = new User({
    name: 'adam',
    password: 'password',
    admin: true
  });

  adam.save().then(() => {
    console.log('User created');
    res.json({success: true});
  }, (err) => {
    throw err;
  });
});

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({message:'Welcome to api'});
});

apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

apiRoutes.post('/authenticate', (req, res) => {
  User.findOne({});
});

app.use('/api', apiRoutes);

app.listen(port);
console.log(`Server started on ${port}`);
