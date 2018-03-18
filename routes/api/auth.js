const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const { ExtractJwt } = passportJWT;

const { User } = require("../../models/index");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: "supersecret"
};

// URL: api/auth/login
router.post("/login", function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "no such user found" });
      } else if (password === user.password) {
        const payload = { user };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: "ok", token });
      }
      res.status(401).json({ message: "passwords did not match" });
    })
    .catch(error => console.error(error));
});

// User#create, URL: api/auth/signup, METHOD: POST
router.post("/signup", function(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
    .then(user => {
      const payload = { id: user.id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ user, message: "ok", token: token });
    })
    .catch(err => {
      res.json({ err: { name: err.name, message: err.message } });
    });
});

module.exports = router;
