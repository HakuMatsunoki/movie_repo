const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const errors = require('./constants/errors');
const AppError = require('./utils/appError');
const logger = require('./utils/logger');
const globalErrorHandler = require('./controllers/errorController');
const authRouter = require('./routes/authRoutes');
const movieRouter = require('./routes/movieRoutes');
const models = require('./models');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(xss());
app.use(hpp());
// app.use(
//   hpp({
//     whitelist: ['duration', 'difficulty', 'price']
//   })
// );

app.use(compression());

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  req.requestTime = new Date().toISOString();
  logger.info(`${req.requestTime} - ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} from  ${ip}`);

  next();
});

app.use(fileUpload());

app.use('/api/v1', authRouter);
app.use('/api/v1/movies', movieRouter);

// test controller
app.get('/api/v1', async (req, res) => {
  const { Op } = require('sequelize');
  const { Actor } = require('./models');

  const users = await models.User.findAll();
  const movies = await models.Movie.findAll();

  res.status(200).json({
    total: movies.length,
    users,
    movies
  });
});

app.get('/live-check', (req, res) => {
  res.sendStatus(200);
});

app.all('*', (req, res, next) => {
  next(new AppError(errors.NOT_FOUND));
});

app.use(globalErrorHandler);

module.exports = app;
