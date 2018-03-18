const express = require("express");
const router = express.Router();
const passport = require("passport");

// Profile#show URL: /api/profile, METHOD: GET
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const profile = await user.getProfile({ raw: true });

      res.json({
        profile: Object.assign(arr[1], {
          firstName: arr[0].firstName,
          lastName: arr[0].lastName
        })
      });
    } catch (err) {
      res.json({ err: { name: err.name, message: err.message } });
    }
  }
);

// Profile#create URL: /api/profile/new, METHOD: POST
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { user } = req;
    const { age, weight, height, gender } = req.body;

    try {
      const profile = await user.createProfile({
        age,
        weight,
        height,
        gender
      });

      res.json({ profile });
    } catch (err) {
      res.json({ err: { name: err.name, message: err.message } });
    }
  }
);

module.exports = router;
