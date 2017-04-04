const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

const {User} = require('../../models/index');

// User#show URL: /api/user, METHOD: GET
router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  // req.user is put there by passport.js
  // passport will be able to identify a user by the jwt token in the header of their json requests (i.e. Authorization: JWT dajLKDASHUIWQ:OHAH:I)
  // the user is determine by your code in auth/login, which is set by const payload = {id: user.id};
  const {user} = req; // in this case, req.user is user.id
  User
    .findById(user)
    .then(user => res.json({user}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

module.exports = router;
