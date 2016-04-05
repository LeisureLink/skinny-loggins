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
  return _.capitalize(value);
};

export default function (settings){
  settings = validate(settings, settingsSchema);
  debug('available transports: %o', _.keys(winston.transports));
  settings.transports = _.map(settings.transports, (conf, tName) => {
    debug('Adding transport:', tName, conf);
    const transportName = getTransportName(tName);
    const Transport = winston.transports[transportName];
    if(!Transport){
      throw new Error(`Transport ${tName} does not seem to exist.`);
    }
    const defaultConf = transportDefaults[transportName];
    const config = _.assign(defaultConf, conf);
    const transport = new Transport(config);
    //keep the app from crashing when there is a logstash connection issue.
    if(transportName.toUpperCase() === 'LOGSTASH'){
      transport.on('error', function(err) {
        console.error(`Logstash error occurred: ${err}`);
      });
    }
    return transport;
  });

  let logger = new Logger(settings);

  const logFactory = (moduleName) =>{
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
  logFactory.consumeFrom = (eventSink) =>{
    eventSink.on('log', (ev) => {
      if (ev.namespace) {
        if (ev.err) {
          logger.log(ev.kind, `${ev.namespace}:`, ev.message, ev.err);
        } else {
          logger.log(ev.kind, `${ev.namespace}:`, ev.message);
        }
      } else if (ev.err) {
        logger.log(ev.kind, ev.message, ev.err);
      } else {
        logger.log(ev.kind, ev.message);
      }
    });
  };
  return logFactory;
}
