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

export default function (settings, transports){
  settings = validate(settings, settingsSchema);
  let logger = new Logger(settings);

  /*
    Not the way I want to do it but works for now.
    Should Just create and extend the current defaulted transports
    Then create the logger.
  */
  _.each(transports, (conf, name) => {
    const transportName = getTransportName(name);
    const transport = winston.transports[transportName];
    const config = _.merge(transportDefaults[transportName], conf);
    debug('Adding transport: ', transportName, config);
    try{
      logger.remove(transport);
    } catch(e){ debug(e); }
    logger.add(transport, config);
  });

  return (moduleName) =>{
    return {
      silly: logger.log.bind(logger, 'silly', moduleName),
      debug: logger.log.bind(logger, 'debug', moduleName),
      verbose: logger.log.bind(logger, 'verbose', moduleName),
      log: logger.log.bind(logger),
      info: logger.log.bind(logger, 'info', moduleName),
      warn: logger.log.bind(logger, 'warn', moduleName),
      error: logger.log.bind(logger, 'error', moduleName),
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
      getTransportByName: (name) =>{
        let transportName = getTransportName(name);
        return winston.transports[transportName];
      }
    };
  };
}
