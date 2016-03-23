import joi from 'joi';
import loggingLevels from '../logging-levels';

export default joi.object({
  level: loggingLevels.default('info'),
  silent: joi.boolean(),
  colorize: joi.boolean(),
  timestamp: joi.alternatives().try(joi.boolean().default(true), joi.func()),
  filename: joi.string().default('logs.log'),
  maxsize: joi.number().default(5242880), // 5MB
  maxFiles: joi.number().default(5),
  stream: joi.any(),
  json: joi.boolean().default(true),
  eol: joi.string().default('\n'),
  prettyPrint: joi.alternatives().try(joi.boolean(), joi.func()),
  depth: joi.number().when('prettyPrint', { is: true, otherwise: joi.forbidden() }),
  logstash: joi.boolean().default(true),
  showLevel: joi.boolean().default(true),
  formatter: joi.func().when('json', { is: true, then: joi.forbidden() }),
  tailable: joi.boolean(),
  maxRetries: joi.number(),
  zippedArchive: joi.boolean(),
  options: joi.object().default({ flags: 'a' })
}).label('File Transport');
