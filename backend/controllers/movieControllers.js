const Movie = require('../models/movieModel');
const movieModel = require('../models/movieModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllMovies = catchAsync(async (req, res, next) => {
    const data = await Movie.find();
    Movie.findByIdAndDelete

    res.status(200).json({
        status: "success",
        results: data.length,
        data
    })
})

exports.createMovie = factory.createOne(Movie);

exports.getMovieById = factory.getOne(Movie);

exports.deleteMovieByID = factory.deleteOne(Movie);