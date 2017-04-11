const express = require('express');
const router = express.Router();
const passport = require('passport');

const {User} = require('../../models/index');

// Profile#show URL: /api/profile, METHOD: GET
router.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  User
    .findById(req.user)
    .then(user => Promise.all([user, user.getProfile({raw: true})]))
    .then(arr => {
      return res.json({
        profile: Object.assign(
          arr[1],
          {firstName: arr[0].firstName,
            lastName: arr[0].lastName}
        )
      });
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

// Profile#create URL: /api/profile/new, METHOD: POST
router.post('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  const {user} = req;
  const {age, weight, height, gender} = req.body;
  console.log(user);
  User
    .findById(user)
    .then(user => user.createProfile({age: age, weight, height, gender}))
    .then(profile => res.json({profile}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

module.exports = router;
