const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/users', authMiddleware.checkNewUser, authController.signup);
router.post('/sessions', authMiddleware.checkUserCreds, authController.login);

module.exports = router;
