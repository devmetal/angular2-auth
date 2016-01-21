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

const verifiyToken = function verifiyToken(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.status(401).json({success: false, message: 'Authentication failed'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Authentication failed'
    });
  }
}

apiRoutes.get('/', verifiyToken, (req, res) => {
  res.json({message:'Welcome to api'});
});

apiRoutes.get('/users', verifiyToken, (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

apiRoutes.get('/me', verifiyToken, (req, res) => {
  res.json({
    success: true,
    me: req.decoded
  });
});

apiRoutes.post('/authenticate', (req, res) => {
  User.findOne({
    name: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).json({success: false, message: 'Authentication failed'});
    } else {
      if (user.password != req.body.password) {
        res.status(401).json({success: false, message: 'Authentication failed'});
      } else {
        let token = jwt.sign({name: user.name, admin: user.admin}, app.get('superSecret'), {
          experiesInMinutes: 1440
        });

        res.json({
          success: true,
          message: 'Auth success',
          token: token
        });
      }
    }
  });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log(`Server started on ${port}`);
