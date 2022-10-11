const catchAsync = require('../utils/catchAsync');
const { OK } = require('../constants/statuses');
const movieService = require('../services/movieService');

/**
 * Get all movies list.
 * @method GET
 * @param {Function} RequestHandler
 */
exports.getAllMovies = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const movies = await movieService.getAllMovies(userId, req.query);

  res.status(200).json({
    status: OK,
    data: movies,
    meta: movies.length
  });
});

/**
 * Create new movie.
 * @method POST
 * @param {Function} RequestHandler
 */
exports.createMovie = catchAsync(async (req, res) => {
  const movieData = { user: req.user, ...req.movieData };

  const movie = await movieService.createMovie(movieData);

  res.status(201).json({
    status: OK,
    data: movie
  });
});

/**
 * Edit movie.
 * @method PATCH
 * @param {Function} RequestHandler
 */
exports.editMovie = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { movieData } = req;

  const movie = await movieService.editMovie(id, movieData);

  res.status(200).json({
    status: OK,
    data: movie
  });
});

/**
 * Get movie by id.
 * @method GET
 * @param {Function} RequestHandler
 */
exports.getMovie = catchAsync(async (req, res) => {
  const { id } = req.params;

  const movie = await movieService.getMovie(id);

  res.status(200).json({
    status: OK,
    data: movie
  });
});

/**
 * Delete movie by id.
 * @method DELETE
 * @param {Function} RequestHandler
 */
exports.deleteMovie = catchAsync(async (req, res) => {
  const { id } = req.params;

  await movieService.deleteMovie(id);

  res.status(200).json({
    status: OK
  });
});

/**
 * Upload text movies list.
 * @method POST
 * @param {Function} RequestHandler
 */
exports.uploadTxt = catchAsync(async (req, res) => {
  const { movies } = req.files;

  const { data, meta } = await movieService.loadFromFile(movies, req.user);

  res.status(200).json({
    status: OK,
    data,
    meta
  });
});
