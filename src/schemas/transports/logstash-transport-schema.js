import joi from 'joi';

export default joi.object({
  localhost: joi.string().trim().exmaple('localhost'),
  host: joi.string().trim().example('127.0.0.1').required(),
  port: joi.number().example(28777).required(),
  'node_name': joi.string(),
  pid: joi.number(),
  'max_connect_retries': joi.number(),
  'timeout_connect_retries': joi.number(),
  logstash: joi.boolean(),
  'ssl_enable': joi.boolean(),
  'ssl_key': joi.alternatives().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.string() }),
  'ssl_cert': joi.alternatives().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.string() }),
  ca: joi.alternatives().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.string() }),
  'ssl_passphrase': joi.alternatives().when('ssl_enable', { is: false, then: joi.forbidden(), otherwise: joi.string() }),
  rejectUnauthorized: joi.boolean(),

  'strip_colors': joi.boolean(),
  label: joi.string(),
  'meta_defaults': joi.object()
}).label('Logstash Transport');
