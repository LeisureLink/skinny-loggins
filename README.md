# Skinny Loggins

![Skinny Loggins](https://raw.githubusercontent.com/LeisureLink/skinny-loggins/master/docs/images/logo.png?token=AAIToGArZ99_nV2AswlU_a4wC-ceBxRAks5WAsICwA%3D%3D)

[![Build Status](https://travis-ci.org/LeisureLink/skinny-loggins.svg?branch=master)](https://travis-ci.org/LeisureLink/skinny-loggins)

The logger of your dreams.

## Get going setup

The file logger will log to `./logs/all-logs.log`.

```javascript
var Loggins = require('skinny-loggins');

// This will create a console logger
// and a file logger (./logs/all-logs.log)
var logger = new Loggins();

logger.log('I went to the Danger Zone');
```

## Configure the setup
```javascript
var Loggins = require('skinny-loggins');

var transports = {
  file: {
    filename: './folder/error.log',
    //...
  }
};

var logger = new Loggins(transports);

logger.log('something cool');
```

## Adding and removing transports
```javascript
var Loggins = require('skinny-loggins');
var logger = new Loggins();

// create an http transport
var transport = {
  host: 'http://some.url'
};
logger.add('http', transport);

// remove
logger.remove('http');
```

## defaults

If you new up a logger but don't specify a transport for it to log on, these are the defaults to which you will receive on demand.

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
