const express = require('express');
const movieController = require('../controllers/movieControllers');
const authController = require('../controllers/authControllers');

const movieRouter = express.Router()

movieRouter
    .route("/")
    .get(movieController.getAllMovies)
    .post(authController.protected, authController.restrictedToAdmin, movieController.createMovie);

movieRouter
    .route("/:id")
    .get(authController.protected, movieController.getMovieById)
    .delete(authController.protected, authController.restrictedToAdmin, movieController.deleteMovieByID)

module.exports = movieRouter