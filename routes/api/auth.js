const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

const {User} = require('../../models/index');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // The secretOrKey is the secret that our tokens will be signed with. Choose this wisely or use a private key.
  secretOrKey: 'supersecret'
}

router.post('/login', function(req, res, next) {
  const {email, password} = req.body;
  console.log(email, password);
  // if (username && password) {
  User
    .findOne({where: {email}})
    .then(user => {
      // console.log(req.body);
      if (!user) {
        res.status(401).json({message:"no such user found"});
      }
      else if (password === user.password) {
        const payload = {id: user.id};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: 'ok', token: token});
      } else {
        res.status(401).json({message: 'passwords did not match'});
      }
    })
    .catch(console.info);
});

module.exports = router;
