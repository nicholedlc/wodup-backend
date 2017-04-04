const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

const {User, Profile} = require('../../models/index');

// Profile#show URL: /api/profile, METHOD: GET
router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  // req.user is put there by passport.js
  // passport will be able to identify a user by the jwt token in the header of their json requests (i.e. Authorization: JWT dajLKDASHUIWQ:OHAH:I)
  // the user is determined by your code in auth/login, which is set by const payload = {id: user.id};
  const {user} = req; // in this case, req.user is user.id
  debugger;
  User
    .findById(user)
    .then(user => user.getProfile())
    .then(profile => res.json({profile}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

module.exports = router;
