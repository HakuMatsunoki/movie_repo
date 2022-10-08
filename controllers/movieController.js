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
  const movieData = { user: req.user, ...req.movieData };

  const movie = await movieService.createMovie(movieData);

  res.status(201).json({
    status: OK,
    data: movie
  });
});

exports.editMovie = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { movieData } = req;

  const movie = await movieService.editMovie(id, movieData);

  res.status(200).json({
    status: OK,
    data: movie
  });
});

exports.getMovie = catchAsync(async (req, res) => {
  const { id } = req.params;

  const movie = await movieService.getMovie(id);

  res.status(200).json({
    status: OK,
    data: movie
  });
});

exports.deleteMovie = catchAsync(async (req, res) => {
  const { id } = req.params;

  await movieService.deleteMovie(id);

  res.status(200).json({
    status: OK
  });
});

exports.uploadTxt = catchAsync(async (req, res) => {
  const { file } = req.files;

  const movies = await movieService.loadFromFile(file);

  res.status(200).json({
    status: OK,
    data: movies
  });
});
