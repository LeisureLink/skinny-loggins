import joi from 'joi';

export default joi.string()
  .regex(/[Ff]ile|[Hh]ttp|[Cc]onsole/)
  .label('transportName');
