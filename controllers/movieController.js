const catchAsync = require('../utils/catchAsync');
const { OK } = require('../constants/statuses');
const movieService = require('../services/movieService');

exports.getAllMovies = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const movies = await movieService.getAllMovies(userId);

  res.status(200).json({
    status: OK,
    data: movies,
    meta: movies.length
  });
});

exports.createMovie = catchAsync(async (req, res) => {
  const movieData = { user: req.user, ...req.body };

  const movie = await movieService.createMovie(movieData);

  res.status(201).json({
    status: OK,
    data: movie
  });
});
