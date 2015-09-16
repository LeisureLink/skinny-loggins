'use strict';
var path = require('path');
var winston = require('winston');

winston.emitErrs = true;

var logger = new winston.Logger({
  exitOnError: false
});

var defaults = {
  file: {
    level: 'debug',
    filename: path.resolve('./logs/all-logs.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    timestamp: true,
    prettyPrint: true,
    depth: 1,
    level: 'info',
    handleExceptions: true,
    colorize: true
  },
  settings : {
    file: {},
    console: {}
  }
};

function createFileTransport(config) {
  var settings = _.merge(config, defaults.file);
  winston.add(winston.transports.File, settings);
};

function createConsoleTransport(config) {
  var settings = _.merge(config, defaults.console);
  winston.add(winston.transports.Console, settings);
};

var transports = {
  createFileTransport: createFileTransport,
  createConsoleTransport: createConsoleTransport
};

function getTransportFunction(transport) {
  var upper = transport[0].toUpperCase() + transport.substring(1);
  return 'create' + upper + 'Transport';
};


/**
* settings.file = { filename: '', level: 'debug' }
* settings.console = { level: 'debug' }
*/
module.exports = function (settings){
  settings = settings || defaults.settings;

  _.forEach(settings, function(value, key) {
    var func = getTransportFunction(key)
    if(transports[func]) {
      transports[func](value);
    }
  });

  return logger;
};
