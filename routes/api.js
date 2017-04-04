const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

const auth = require('./api/auth');
const user = require('./api/user');
const exercises = require('./api/exercises');
const profile = require('./api/profile');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // The header Access-Control-Allow-Headers is used in a CORS pre-flight to tell the client which HTTP headers are allowed in the request
  res.header("Access-Control-Allow-Headers", //this is the header
            "Authorization, Origin, X-Requested-With, Content-Type, Accept"); //this is the value
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
  next();
});

router.use('/auth', auth);

router.use('/user', user);

router.use('/profile',profile)

router.use('/exercises', exercises);

module.exports = router;
