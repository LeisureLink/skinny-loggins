'use strict';
var path = require('path');
var winston = require('winston');

winston.emitErrs = true;

var logger = new winston.Logger({
  exitOnError: false
});

winston.add(winston.transports.File, { filename: path.resolve('./logs/all-logs.log') });

module.exports = logger;
