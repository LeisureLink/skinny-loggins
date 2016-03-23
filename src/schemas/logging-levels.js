import joi from 'joi';

export default joi.string()
  .valid('silly', 'debug', 'verbose', 'info', 'warn', 'error')
  .label('level');
