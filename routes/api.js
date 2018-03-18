const express = require("express");
const router = express.Router();

const auth = require("./api/auth");
const user = require("./api/user");
const exercises = require("./api/exercises");
const profile = require("./api/profile");
const uploads = require("./api/uploads");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  next();
});

router.use("/auth", auth);

router.use("/user", user);

router.use("/profile", profile);

router.use("/exercises", exercises);

router.use("/uploads", uploads);

module.exports = router;
