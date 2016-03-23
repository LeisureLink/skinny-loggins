import winston from 'winston';
import consoleSettings from './console-transport';

export default {
  settings:{
    exitOnError: false,
    emitErrs: true
  },
  transports: [
    new winston.transports.Console(consoleSettings)
  ]
};
