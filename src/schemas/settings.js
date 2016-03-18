import joi from 'joi';
import { transportsArraySchema } from './transports';

// TODO: this vv Down there, do it.
export default joi.object({
  level: joi.string().default('info'),
  transports: transportsArraySchema
}).default({}).label('settings');
