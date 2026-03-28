const express = require('express');
const moviesController = require('../Controllers/moviesController');
const authController =require('../Controllers/authController')
const router = express.Router();
//Creating param middleware this is a special midlledware that only run for a certain route parameter

//router.param('id', moviesController.checkId)
router.route('/highest-rated').get(moviesController.getHighestRated, moviesController.getAllMovies)
router.route('/movies-stats').get(moviesController.getMovieStats)
router.route('/movies-by-genre/:genre').get(moviesController.getMovieByGenre)
// /api/v1/movies
router.route('/')
.get(authController.protect, moviesController.getAllMovies)
.post( moviesController.createMovie);

// /api/v1/movies/:id
router.route('/:id')
.get(moviesController.getMovie)
.patch(moviesController.updateMovie)
.delete(moviesController.deleteMovie);

module.exports = router;