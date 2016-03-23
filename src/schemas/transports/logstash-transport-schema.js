import joi from 'joi';

export default joi.object({
  host: joi.string().required(),
  port: joi.number().default(28777).example(28777),
  logstash: joi.boolean().default(true),
  localhost: joi.string(),
  'node_name': joi.string(),
  pid: joi.number(),
  'max_connect_retries': joi.number(),
  'timeout_connect_retries': joi.number(),
  'ssl_enable': joi.boolean().default(false),
  'ssl_key': joi.string().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.required() }),
  'ssl_cert': joi.string().when('ssl_enable', { is: false, then: joi.forbidden() }),
  ca: joi.string().when('ssl_enable', { is: false, then: joi.forbidden() }),
  'ssl_passphrase': joi.string().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.required() }),
  rejectUnauthorized: joi.boolean().default(false),
  'strip_colors': joi.boolean().default(false),
  label: joi.string(),
  'meta_defaults': joi.object()
}).label('Logstash Transport');
