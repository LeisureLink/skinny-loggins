import joi from 'joi';
import consoleTransportSchema from './console-transport';
import { transports } from '../../defaults/settings';
import fileTransportSchema from './file-transport';

export default {
  transportsArraySchema: joi.array()
    .items(consoleTransportSchema, fileTransportSchema)
    .default(transports).single(),
  transportsSchemas:{
    File: fileTransportSchema,
    Console: consoleTransportSchema
  }
};
