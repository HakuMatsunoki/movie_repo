const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const logger = require('./utils/logger');

process.on('uncaughtException', (err) => {
  logger.error(`UncaughtException - ${err}`);
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`UnhandledRejection - ${err}`);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', (err) => {
  logger.warn(`SIGTERM - ${err}`);

  server.close(() => {
    logger.info('Shutting down..');
  });
});
