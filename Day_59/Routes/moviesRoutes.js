const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

// /api/v1/movies
router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.createMovie);

// /api/v1/movies/:id
router.route('/:id')
.get(moviesController.getMovie)
.patch(moviesController.updateMovie)
.delete(moviesController.deleteMovie);

module.exports = router;