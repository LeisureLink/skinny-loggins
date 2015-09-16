# Skinny Loggins

![Skinny Loggins](https://raw.githubusercontent.com/LeisureLink/skinny-loggins/master/docs/images/logo.png?token=AAIToGArZ99_nV2AswlU_a4wC-ceBxRAks5WAsICwA%3D%3D)

[![Build Status](https://travis-ci.org/LeisureLink/skinny-loggins.svg?branch=master)](https://travis-ci.org/LeisureLink/skinny-loggins)


The logger of your dreams.

## Setup
By default init needs to be ran but no transports need to be passed in. A file and a console transport will be used.
The file logger will log to `./logs/all-logs.log`.

```javascript
var logger = require('skinny-loggins');

// Do this only once
// This sets up the transports for your app
// After that, require skinny-loggins and you are on your way
logger.init({
  file: {},
  console: {}
});

logger.log('Know when to hold them, know when to fold them');
```
