'use strict';
// import path from 'path';
// import _ from 'lodash';
// import winston from 'winston';
// import transportDefaults from './transport-defaults';
// import debug from './noop';
var path = require('path');
var _ = require('lodash');
var winston = require('winston');
var transportDefaults = require('./transport-defaults');
var debug = require('./noop');

function getTransportName(name) {
  return name[0].toUpperCase() + name.substring(1);
};

function getTransportDefaults(name, config) {
  name = name.toLowerCase();
  let transportConfig = transportDefaults[name];
  return _.merge(transportConfig, config);
};

class SkinnyLoggins extends winston.Logger {
  constructor(settings){
    super({ exitOnError: false, emitErrs: true });
    debug('Constructor initialized');
    settings = _.merge(settings || {
      file: transportDefaults.file,
      console: transportDefaults.console
    });
    var self = this;
    this.winstonTransports = {
      file: winston.transports.File,
      console: winston.transports.Console
    };

    _.forEach(settings, function(config, name) {
      debug('Adding transport from settings %s', name);
      debug('adding config %o', config);
      let defaultedConfig = getTransportDefaults(name, config);
      if(defaultedConfig.filename){ // should probably move this out
        defaultedConfig.filename = path.resolve(defaultedConfig.filename);
      }
      self.add(name, defaultedConfig);
    });
  }

  add(transportName, config) {
    let transport = this.getTransportByType(transportName);
    debug('add %o', transport);
    debug('with %o', config);
    if(!transport){
      throw new Error('Transport type is incorrect: ', transportName);
    }
    super.add(transport, config);
  }

  remove(transportName){
    let transport = this.getTransportByType(transportName);
    debug('remove %o', transport);
    if(!transport){
      throw new Error(transportName + ' type does not exist');
    }
    super.remove(transport);
  }

  getTransportByType(transportName){
    let name  = getTransportName(transportName);
    debug('Checking for transport "%s"', name);
    return winston.transports[name];
  }
}

module.exports = SkinnyLoggins;
