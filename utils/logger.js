const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: process.env.LOGZIO_TOKEN,
  host: process.env.LOGZIO_HOST
});

/**
 * Winston logger function.
 */
module.exports = winston.createLogger({
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: process.env.NODE_ENV === 'production' ? [logzioWinstonTransport] : [new winston.transports.Console()]
});
