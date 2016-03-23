import joi from 'joi';
import { transportsSchemas } from './transports';
import { Console } from '../defaults';
import levels from './logging-levels';

export default joi.object({
  level: levels,
  transports: transportsSchemas
}).default({
  level: 'info',
  transports: { Console }
}).label('settings');
