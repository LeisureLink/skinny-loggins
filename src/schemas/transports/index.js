import joi from 'joi';
import consoleTransportSchema from './console-transport';
import { transports } from '../../defaults/settings';
import fileTransportSchema from './file-transport';
import logstashTransportSchema from './logstash-transport-schema';

export default {
  transportsArraySchema: joi.array()
    .items(consoleTransportSchema, fileTransportSchema, logstashTransportSchema)
    .default(transports).single(),
  transportsSchemas: joi.object({
    file: fileTransportSchema,
    File: fileTransportSchema,
    console: consoleTransportSchema,
    Console: consoleTransportSchema,
    logstash: logstashTransportSchema,
    Logstash: logstashTransportSchema
  })
};
