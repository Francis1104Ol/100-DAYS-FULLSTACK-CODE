const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();
//Creating param middleware this is a special midlledware that only run for a certain route parameter

router.param('id', moviesController.checkId)

// /api/v1/movies
router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.validateBody, moviesController.createMovie); //chaining middleware they are executed in the order of which they are declare.

// /api/v1/movies/:id
router.route('/:id')
.get(moviesController.getMovie)
.patch(moviesController.updateMovie)
.delete(moviesController.deleteMovie);

module.exports = router;