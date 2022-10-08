const universalRepository = require('../repositories/universalRepository');
const models = require('../models');
const AppError = require('../utils/appError');
const textParser = require('../utils/textParser');
const errorMsg = require('../constants/errors');

/**
 * Add actors to DB helper function.
 * @param {Array} actorsNamesArr
 * @param {number} movieId
 * @returns {Promise<Array>}
 */
const addActorsHelper = async (actorsNamesArr, movieId) => {
  const actorsPromises = actorsNamesArr.map((name) =>
    universalRepository.createOne('Actor', { name, movieId: movieId })
  );

  const actors = await Promise.all(actorsPromises);

  return actors.map((actor) => {
    delete actor.dataValues.movieId;

    return actor.dataValues;
  });
};

/**
 * Get all movies belong to current user.
 * @param {number} id
 * @returns {Promise<Array>}
 */
exports.getAllMovies = async (id) => {
  const user = await universalRepository.getOne('User', id, {
    include: [{ model: models.Movie, attributes: { exclude: ['userId'] } }]
  });

  return user.dataValues.Movies;
};

/**
 * Create movie.
 * @param {Object} movieData
 * @returns {Promise<Object>}
 */
const createMovie = async (movieData) => {
  const { user, actors: actorsNamesArr, ...restMovieData } = movieData;

  const newMovie = await universalRepository.createOne('Movie', restMovieData);
  const [actors] = await Promise.all([addActorsHelper(actorsNamesArr, newMovie.id), user.addMovie(newMovie)]);

  return { ...newMovie.dataValues, actors };
};
exports.createMovie = createMovie;

/**
 * Edit movie data.
 * @param {number} movieId
 * @param {Object} movieData
 * @returns {Promise<Object>}
 */
exports.editMovie = async (movieId, movieData) => {
  const { actors: newActorsNamesArr, ...restMovieData } = movieData;

  await Promise.all([
    universalRepository.updateOne('Movie', movieId, restMovieData),
    universalRepository.deleteMany('Actor', { where: { movieId } })
  ]);

  const actors = await addActorsHelper(newActorsNamesArr, movieId);
  const updatedMovie = await universalRepository.getOne('Movie', movieId, { attributes: { exclude: 'userId' } });

  return { ...updatedMovie.dataValues, actors };
};

/**
 * Get movie by id.
 * @param {number} movieId
 * @returns {Promise<Object>}
 */
exports.getMovie = async (movieId) => {
  const movieData = await universalRepository.getOne('Movie', movieId, {
    include: [{ model: models.Actor, attributes: { exclude: ['movieId'] } }],
    attributes: { exclude: ['userId'] }
  });

  const { Actors, ...restMovieData } = movieData.dataValues;

  return {
    ...restMovieData,
    actors: Actors
  };
};

/**
 * Delete movie.
 * @param {number} movieId
 * @returns {Promise<void>}
 */
exports.deleteMovie = async (movieId) => {
  await universalRepository.deleteOne('Movie', { where: { id: movieId } });
};

/**
 * Check movie and get owner id.
 * @param {number} movieId
 * @param {Object} movieData
 * @returns {Promise<Object>}
 */
exports.checkMovie = async (movieId) => {
  const movie = await universalRepository.getOne('Movie', movieId, {
    attributes: ['id', 'userId']
  });

  if (!movie) throw new AppError(errorMsg.NOT_FOUND);

  return movie.dataValues;
};

/**
 * Upload movies from txt.
 * @param {Object} file
 * @param {Object} user
 * @returns {Promise<Object>}
 */
exports.loadFromFile = async (file, user) => {
  if (file.mimetype !== 'text/plain') throw new AppError(errorMsg.INVALID_DATA);

  const moviesData = textParser(file);

  const moviesPromise = moviesData.map((movieData) => {
    const { actors, ...restMovieData } = movieData;

    return createMovie({ user, actors, ...restMovieData });
  });

  const data = await Promise.all(moviesPromise);
  const total = await universalRepository.count('Movie', { where: { userId: user.id } });

  const meta = {
    total,
    imported: data.length
  };

  return { data, meta };
};
