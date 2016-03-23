import joi from 'joi';
import supportedTransportsSchema from './supported-transports';
import settingsSchema from './settings';
import loggingLevelsSchema from './logging-levels';
import { transportsArraySchema, transportsSchemas } from './transports';
import debug from '../logger';

const validate = (object, schema) => {
  debug('Validating %o', object);
  const result = joi.validate(object, schema, { abortEarly: false, stripUnknown: true });
  if(result.error){
    throw result.error;
  }
  return result.value;
};

export default {
  validate,
  supportedTransportsSchema,
  transportsArraySchema,
  transportsSchemas,
  settingsSchema,
  loggingLevelsSchema
};
