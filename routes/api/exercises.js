const express = require('express');
const router = express.Router();
const {Exercise} = require('../../models/index');

// URL: /api/exercises, METHOD: GET
router.get('/', function(req, res, next) {
  Exercise
    .findAll()
    .then(exercises => {
      res.json({exercises});
    })
    .catch(res.send);
});

module.exports = router;
