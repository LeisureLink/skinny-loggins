# Skinny Loggins

![Skinny Loggins](https://raw.githubusercontent.com/LeisureLink/skinny-loggins/master/docs/images/logo.png?token=AAIToGArZ99_nV2AswlU_a4wC-ceBxRAks5WAsICwA%3D%3D)

The logger of your dreams.

## Get going setup

```javascript
import createLoggins from '@leisurelink/skinny-loggins';
const logger = createLoggins(/*{settings}*/, /*{transports}*/);

logger.log('debug', 'I went to the Danger Zone');
```

## Logging levels

These are the current logging levels:

  - silly
  - debug
  - verbose
  - info
  - warn
  - error

`logger.log()` is a special case where you can specify the level to which you should log.

```javascript
logger.log('debug', 'Here is my debug message');
logger.log('info', 'Here is my info message');

logger.debug('Here is my debug message');
logger.info('here is my info message');
```

## Configure the setup
```javascript
var createLoggins = require('@leisurelink/skinny-loggins');

var transports = {
  console: {
    level: process.env.LOG_LEVEL, // if undefined it will default to info
    timestamp: false
  },
  file: {
    filename: './folder/error.log',
    //...
  },
  logstash: {
    node_name: 'my app', // or leave blank for defaulted node process name
    host: '99.99.99.99',
    port: 28777
  }
};

var logger = createLoggins(transports);

logger.info('something cool');
```

## Adding and removing transports
```javascript
var createLoggins = require('@leisurelink/skinny-loggins');
var logger = createLoggins();

// create an http transport
var transport = {
  host: 'http://some.url'
};
logger.add('http', transport);

// remove
logger.remove('http');
```

## defaults

If you new up a logger but don't specify a transport for it to log on, these are the defaults.

### console

```javascript
{
  timestamp: true,
  prettyPrint: true,
  depth: 1,
  level: 'info',
  handleExceptions: true,
  colorize: true
}
```

### file

```javascript
{
  level: 'debug',
  filename: './logs/all-logs.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880, //5MB
  maxFiles: 5,
  colorize: false
}
```

### logstash

The logstash information is not defaulted as this should be specified from the environment.
The properties required are:

  - host
  - port

```js
{  }
```
