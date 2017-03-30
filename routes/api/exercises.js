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
      res.json({err: {name: err.name, message: err.message}})
});

// Exercises#show, URL: /api/exercises/:id, METHOD: GET
router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  Exercise
    .findById(id)
    .then(exercise => {
      res.json({exercise})
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

// Exercise#create, URL: /api/exercises METHOD: POST
router.post('/', function(req, res, next) {
  const {name, description} = req.body;
  Exercise
    .create({name, description})
    .then(exercise => res.json({exercise}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})

// Exercises#destroy, URL: /api/exercises/:id, METHOD: DELETE
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  Exercise
    .findById(id)
    .then(exercise => {
      exercise.destroy()
      .then(() => res.json({exercise}))
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}})
    })
})
module.exports = router;
