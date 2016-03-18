import winston from 'winston';
import { settings as defaultSettings, transports as defaultTransports } from './defaults/settings';
import {
  validate,
  supportedTransportsSchema,
  settingsSchema,
  transportsArraySchema,
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



export default function (t=defaultTransports, s=defaultSettings){
  let settings = validate(s, settingsSchema);
  let transports = validate(t, transportsArraySchema);
  settings.transports = transports;
  let logger = new winston.Logger(settings);

  return {
    silly: logger.log.bind(logger, 'silly'),
    debug: logger.log.bind(logger, 'debug'),
    verbose: logger.log.bind(logger, 'verbose'),
    log: logger.log.bind(logger, 'info'),
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
