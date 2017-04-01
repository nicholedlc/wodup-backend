const express = require('express');
const router = express.Router();
const exercises = require('./api/exercises');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // The header Access-Control-Allow-Headers is used in a CORS pre-flight to tell the client which HTTP headers are allowed in the request
  res.header("Access-Control-Allow-Headers", //this is the header
            "Origin, X-Requested-With, Content-Type, Accept"); //this is the value
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // The secretOrKey is the secret that our tokens will be signed with. Choose this wisely or use a private key.
  secretOrKey: 'iLoveSteve'
}

const users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

// fetch(`http://localhost:3636/api/login`, {
//     headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'},
//     method: 'POST',
//     body: JSON.stringify({
//         username: 'jonathanmh',
//         password: '%2yx4'
//     })
// })
// .then(r => r.json())

router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  if (username && password) {
    const user = users.find(({name}) => {
      return username === name;
    })
    if (!user) {
      res.status(401).json({message:"no such user found"});
    }
    else if (user.password === password) {
      const payload = {id: user.id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: 'ok', token: token});
    } else {
      res.status(401).json({message: 'passwords did not match'});
    }
  }
});

// fetch(`http://localhost:3636/api/supersecret`, {
//     headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//           'Authorization': "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDkxMDY4NzI2fQ.oLkuUm1bv3XJeSbxxPnsO6Rjhg_Tr3br3XzNxwTxPI4"},
//     method: 'GET'
// })
// .then(r => r.json())
// .then(console.info);

router.get('/supersecret', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.json(req.user);
});

router.use('/exercises', exercises);

module.exports = router;
