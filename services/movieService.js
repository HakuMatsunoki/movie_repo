const universalRepository = require('../repositories/universalRepository');
const models = require('../models');
const AppError = require('../utils/appError');
const textParser = require('../utils/textParser');
const errorMsg = require('../constants/errors');

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

exports.getAllMovies = async (id) => {
  const user = await universalRepository.getOne('User', id, {
    include: [{ model: models.Movie, attributes: { exclude: ['userId'] } }]
  });

  return user.dataValues.Movies;
};

exports.createMovie = async (movieData) => {
  const { user, actors: actorsNamesArr, ...restMovieData } = movieData;

  const newMovie = await universalRepository.createOne('Movie', restMovieData);
  const [actors] = await Promise.all([addActorsHelper(actorsNamesArr, newMovie.id), user.addMovie(newMovie)]);

  return { ...newMovie.dataValues, actors };
};

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

exports.deleteMovie = async (movieId) => {
  await universalRepository.deleteOne('Movie', { where: { id: movieId } });
};

exports.checkMovie = async (movieId) => {
  const movie = await universalRepository.getOne('Movie', movieId, {
    attributes: ['id', 'userId']
  });

  if (!movie) throw new AppError(errorMsg.NOT_FOUND);

  return movie.dataValues;
};

exports.loadFromFile = (file) => {
  if (file.mimetype !== 'text/plain') throw new AppError(errorMsg.INVALID_DATA);

  const moviesData = textParser(file);

  console.log(moviesData);

  return { dummy: 'dummy' };
};
