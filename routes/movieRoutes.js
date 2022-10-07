const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/').get(movieController.getAllMovies).post(movieController.createMovie);
// router.route('/:id', authMiddleware.checkUserCreds, authController.login);

module.exports = router;
