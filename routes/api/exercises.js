const express = require('express');
const router = express.Router();
const {Exercise} = require('../../models/index');

// Exercises#index, URL: /api/exercises, METHOD: GET
router.get('/', function(req, res, next) {
  Exercise
    .findAll()
    .then(exercises => {
      res.json({exercises});
    })
    .catch(res.send);
});

// Exercise#show, URL: /api/exercises/:id, METHOD: GET
router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  Exercise
    .findById(id)
    .then(exercise => {
      res.json({exercise})
    })
    .catch(error => {
      res.json({error: {name: err.name, message: err.message}})
    })
})

module.exports = router;
