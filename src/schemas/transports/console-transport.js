import joi from 'joi';
import loggingLevels from '../logging-levels';

export default joi.object({
  level: loggingLevels.default('info'),
  silent: joi.boolean().default(false),
  colorize: joi.boolean().default(true),
  timestamp: joi.boolean().default(true),
  json: joi.boolean().default(true),
  stringify: joi.boolean().default(true),
  prettyPrint: joi.alternatives().try(joi.boolean().default(true), joi.func()),
  depth: joi.number().default(null),
  humanReadableUnhandledException: joi.boolean().default(true),
  showLevel: joi.boolean().default(true),
  formatter: joi.func().default(undefined),
  stderrLevels: joi.array().items(joi.string()).default(['error', 'debug'])
});
