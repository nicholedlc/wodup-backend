const express = require('express');
const router = express.Router();
const exercises = require('./api/exercises');
const auth = require('./api/auth');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // The header Access-Control-Allow-Headers is used in a CORS pre-flight to tell the client which HTTP headers are allowed in the request
  res.header("Access-Control-Allow-Headers", //this is the header
            "Origin, X-Requested-With, Content-Type, Accept"); //this is the value
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

router.use('/auth', auth);

router.use('/exercises', exercises);

module.exports = router;
