import joi from 'joi';
import consoleTransportSchema from './console-transport';
import fileTransportSchema from './file-transport';

export default {
  transportsArraySchema: joi.array().items(consoleTransportSchema, fileTransportSchema).single(),
  transportsSchemas:{
    File: fileTransportSchema,
    Console: consoleTransportSchema
  }
};
