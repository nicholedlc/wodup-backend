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
  const {user: userId} = req; // in this case, req.user is user.id
  User
    .findById(userId)
    .then(user => Promise.all([user, user.getProfile({raw: true})]))
    .then(arr => {
      return res.json({
        profile: Object.assign(
          arr[1],
          {firstName: arr[0].firstName,
          lastName: arr[0].lastName}
        )
      }
    )})
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

// Profile#create URL: /api/profile/new, METHOD: POST
router.post('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  // const {dob, height, weight, gender} = req.body;
  const {user} = req;
  const {age, weight, height, gender} = req.body;
  console.log(user);
  User
    .findById(user)
    .then(user => user.createProfile({age: age, weight, height, gender}))
    .then(profile => res.json({profile}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

module.exports = router;
