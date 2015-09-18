'use strict';
module.exports = {
  level: 'debug',
  filename: './logs/all-logs.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880, //5MB
  maxFiles: 5,
  colorize: false
};
