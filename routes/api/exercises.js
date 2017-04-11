const express = require('express');
const router = express.Router();

const {Exercise, Log} = require('../../models/index');

// Exercises#index, URL: /api/exercises, METHOD: GET
router.get('/', function (req, res, next) {
  Exercise
    .findAll({order: [['name', 'ASC']]})
    .then(exercises => {
      res.json({exercises});
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

// Exercise#create, URL: /api/exercises METHOD: POST
router.post('/', function (req, res, next) {
  const {name, description} = req.body;
  Exercise
  .create({name, description})
  .then(exercise => res.json({exercise}))
  .catch(err => {
    res.json({err: {name: err.name, message: err.message}});
  });
});

// Exercises#show, URL: /api/exercises/:id, METHOD: GET
router.get('/:id', function (req, res, next) {
  const {id} = req.params;
  Promise.all([
    Exercise.findById(id, {raw: true}),
    Log.findAll({where: {ExerciseId: id}, raw: true, order: [['date', 'DESC']]})
  ])
    .then(([exercise, log]) =>
      res.json({exercise: Object.assign(exercise, {log})}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

// Exercise#update, URL: /api/exercises/:id, METHOD: PUT
router.put('/:id', function (req, res, next) {
  const {id} = req.params;
  const {name, description} = req.body;
  Exercise
    .findById(id)
    .then(exercise => {
      exercise.update({name, description});
    })
    .then(exercise => {
      res.json({exercise});
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

// Exercises#destroy, URL: /api/exercises/:id, METHOD: DELETE
router.delete('/:id', function (req, res, next) {
  const {id} = req.params;
  Exercise
    .findById(id)
    .then(exercise => {
      exercise.destroy()
      .then(() => res.json({exercise}));
    })
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

// Log#create, URL: /api/exercises/:id/log, METHOD: POST
router.post('/:id/log', function (req, res, next) {
  const {id} = req.params;
  const {rep, set, weight, note, date, imageUrl} = req.body;
  Exercise
    .findById(id)
    .then(exercise => exercise.createLog({rep, set, weight, note, date, imageUrl}))
    .then(log => res.json({log}))
    .catch(err => {
      res.json({err: {name: err.name, message: err.message}});
    });
});

module.exports = router;
