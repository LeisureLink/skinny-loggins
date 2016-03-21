import joi from 'joi';
import { transportsArraySchema } from './transports';

export default joi.object({
  level: joi.string().default('info'),
  transports: transportsArraySchema
}).default({}).label('settings');
