import joi from 'joi';
import loggingLevels from '../logging-levels';

export default joi.object({
  level: loggingLevels.default('info'),
  silent: joi.boolean().default(false),
  colorize: joi.boolean().default(true),
  timestamp: joi.alternatives().try(joi.func(), joi.boolean()),
  json: joi.boolean().default(false),
  stringify: joi.boolean().default(true),
  prettyPrint: joi.alternatives().try(joi.boolean(), joi.func()).default(false),
  depth: joi.number(),
  humanReadableUnhandledException: joi.boolean().default(true),
  showLevel: joi.boolean().default(true),
  formatter: joi.func(),
  stderrLevels: joi.array().items(joi.string()).default(['error', 'debug'])
}).label('Console Transport');
