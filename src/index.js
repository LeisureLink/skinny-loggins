try{
  require('source-map-support/register');
}catch(e){}
import winston, { Logger } from 'winston';
import _ from 'lodash';
import transportDefaults from './defaults';
import debug from './logger';
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

// export default class SkinnyLoggins extends winston.Logger {
//   constructor(settings){
//     super({ exitOnError: false, emitErrs: true });
//     var self = this;
//     debug('Constructor initialized');
//     settings = _.merge(settings || {
//       console: transportDefaults.console
//     });
//     this.winstonTransports = {
//       console: winston.transports.Console
//     };
//
//     _.forEach(settings, function(config, name) {
//       debug('Adding transport from settings %s', name);
//       debug('adding config %o', config);
//       let defaultedConfig = getTransportDefaults(name, config);
//       if(defaultedConfig.filename){ // should probably move this out
//         defaultedConfig.filename = path.resolve(defaultedConfig.filename);
//       }
//       self.add(name, defaultedConfig);
//     });
//   }
//
//   add(transportName, config) {
//     let transport = this.getTransportByType(transportName);
//     debug('add %o', transport);
//     debug('with %o', config);
//     if(!transport){
//       throw new Error('Transport type is incorrect: ', transportName);
//     }
//     super.add(transport, config);
//   }
//
//   remove(transportName){
//     let transport = this.getTransportByType(transportName);
//     debug('remove %o', transport);
//     if(!transport){
//       throw new Error(transportName + ' type does not exist');
//     }
//     super.remove(transport);
//   }
//
//   getTransportByType(transportName){
//     let name  = getTransportName(transportName);
//     debug('Checking for transport "%s"', name);
//     return winston.transports[name];
//   }
// }

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
    logger.remove(transport);
    logger.add(transport, config);
  });

  return {
    silly: logger.log.bind(logger, 'silly'),
    debug: logger.log.bind(logger, 'debug'),
    verbose: logger.log.bind(logger, 'verbose'),
    log: logger.log.bind(logger),
    info: logger.log.bind(logger, 'info'),
    warn: logger.log.bind(logger, 'warn'),
    error: logger.log.bind(logger, 'error'),
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
}
