# Skinny Loggins

![Skinny Loggins](https://raw.githubusercontent.com/LeisureLink/skinny-loggins/master/docs/images/logo.png?token=AAIToGArZ99_nV2AswlU_a4wC-ceBxRAks5WAsICwA%3D%3D)

[![Build Status](https://travis-ci.org/LeisureLink/skinny-loggins.svg?branch=master)](https://travis-ci.org/LeisureLink/skinny-loggins)


The logger of your dreams.

## Requirements
To get this logger working, you will need to use
  - `node 4.1`

## Get going setup

The file logger will log to `./logs/all-logs.log`.

```javascript
var Loggins = require('skinny-loggins');

// This will create a console logger
// and a file logger (./logs/all-logs.log)
var logger = new Loggins();

logger.log('Know when to hold them, know when to fold them');
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
