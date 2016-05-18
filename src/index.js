try{
  require('source-map-support/register');
}catch(e){}
import transportDefaults from './defaults';
import winston, { Logger } from 'winston';
import debug from './logger';
import _ from 'lodash';
import 'winston-logstash';
import path from 'path';

import {
  validate,
  supportedTransportsSchema,
  settingsSchema,
  transportsSchemas
} from './schemas';

const getTransportName = (name) => {
  let value = validate(name, supportedTransportsSchema);
  return _.capitalize(value);
};

export default function (settings) {
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

  const addTransport = (name, transportConfig) => {
    let transportName = getTransportName(name);
    let config = validate(transportConfig, transportsSchemas[transportName]);
    logger.add(winston.transports[transportName], config);
  };
  const removeTransport = (name) => {
    let transportName = getTransportName(name);
    let transport = winston.transports[transportName];
    logger.remove(transport);
  };

  const createLogObject = (moduleName)=>{
    let bindKind = (kind) => logger.log.bind(logger, kind);
    let log = (kind, ...args) => {
      logger.log(kind, ...args);
    };
    if (moduleName) {
      let prefix = `${moduleName}:`;
      bindKind = (kind) => logger.log.bind(logger, kind, prefix);
      log = (kind, ...args) => logger.log(kind, prefix, ...args);
    }

    return {
      silly: bindKind('silly'),
      debug: bindKind('debug'),
      verbose: bindKind('verbose'),
      info: bindKind('info'),
      warn: bindKind('warn'),
      error: bindKind('error'),
      log: log,

      addTransport: addTransport,
      removeTransport: removeTransport,

      on: logger.on.bind(logger),
      once: logger.once.bind(logger)
    };
  };

  const logFactory = (moduleName) => { // eslint-disable-line
    moduleName = (moduleName || moduleName === false || !module || !module.parent || !module.parent.id) ? moduleName : path.basename(module.parent.id, '.js');
    return createLogObject(moduleName);
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

  //the log factory doesn't have to be executed if you just want to log with no module name.
  //e.g. logFactory.info('hi');
  Object.assign(logFactory, createLogObject(false));

  return logFactory;
}
