try{
  require('source-map-support/register');
}catch(e){}
import transportDefaults from './defaults';
import winston, { Logger } from 'winston';
import debug from './logger';
import _ from 'lodash';
import 'winston-logstash';

import {
  validate,
  supportedTransportsSchema,
  settingsSchema,
  transportsSchema
} from './schemas';

const getTransportName = (name) =>{
  let value = validate(name, supportedTransportsSchema);
  return value[0].toUpperCase() + value.substring(1);
};

export default function (settings){
  settings = validate(settings, settingsSchema);
  settings.transports = _.map(settings.transports, (conf, tName) => {
    debug('Adding transport:', tName, conf);
    const transportName = getTransportName(tName);
    const Transport = winston.transports[transportName];
    const defaultConf = transportDefaults[transportName];
    const config = _.assign(defaultConf, conf);
    return new Transport(config);
  });

  let logger = new Logger(settings);

  return (moduleName) =>{
    let namespace = `${moduleName}:`;
    return {
      silly: logger.log.bind(logger, 'silly', namespace),
      debug: logger.log.bind(logger, 'debug', namespace),
      verbose: logger.log.bind(logger, 'verbose', namespace),
      log: logger.log.bind(logger),
      info: logger.log.bind(logger, 'info', namespace),
      warn: logger.log.bind(logger, 'warn', namespace),
      error: logger.log.bind(logger, 'error', namespace),
      addTransport: (name, transportConfig) =>{
        let transportName = getTransportName(name);
        let config = validate(transportConfig, transportsSchema[transportName]);
        logger.add(winston.transports[transportName], config);
      },
      removeTransport: (name) =>{
        let transportName = getTransportName(name);
        let transport = winston.transports[transportName];
        logger.remove(transport);
      },
      on: logger.on.bind(logger)
    };
  };
}
