const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const movieMiddleware = require('../middlewares/movieMiddleware');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.use(authMiddleware.protect);
router.route('/').get(movieController.getAllMovies).post(movieMiddleware.checkMovieData, movieController.createMovie);

router.post('/import', movieController.uploadTxt);

router.use('/:id', movieMiddleware.checkMovieIdAndOwner);
router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(movieMiddleware.checkMovieData, movieController.editMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
