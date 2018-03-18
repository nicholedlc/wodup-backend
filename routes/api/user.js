const express = require("express");
const router = express.Router();
const passport = require("passport");

const { User } = require("../../models/index");

// User#show, URL: /api/user, METHOD: GET
router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  const { user } = req;
  User.findById(user)
    .then(user => res.json({ user }))
    .catch(err => {
      res.json({ err: { name: err.name, message: err.message } });
    });
});

module.exports = router;
