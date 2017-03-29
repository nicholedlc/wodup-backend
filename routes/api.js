const express = require('express');
const router = express.Router();
const exercises = require('./api/exercises');

router.use('/exercises', exercises);

module.exports = router;
