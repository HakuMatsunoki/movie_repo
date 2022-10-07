const universalRepository = require('../repositories/universalRepository');
const models = require('../models');

exports.getAllMovies = async (id) => {
  const user = await universalRepository.getOne('User', id, {
    include: [{ model: models.Movie, attributes: { exclude: ['userId'] } }]
  });

  return user.dataValues.Movies;
};

exports.createMovie = async (movieData) => {
  const { user, actors, ...restMovieData } = movieData;

  const newMovie = await universalRepository.createOne('Movie', restMovieData);
  await user.addMovie(newMovie);

  // const actorsPromises = actors.map((actor) => {
  //   const newActor = universalRepository.createOne('Actor', { name: actor });

  //   return newActor;
  // });

  // const actorsData = await Promise.all(actorsPromises);

  // // const actorsIds = actorsData.map((actor) => actor.dataValues.id);
  // actorsData.forEach(async (actor) => {
  //   await newMovie.addActor(actor);
  // });

  return newMovie.dataValues;
};
