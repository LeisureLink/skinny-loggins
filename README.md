# Skinny Loggins

![Skinny Loggins](https://raw.githubusercontent.com/LeisureLink/skinny-loggins/master/docs/images/logo.png?token=AAIToGArZ99_nV2AswlU_a4wC-ceBxRAks5WAsICwA%3D%3D)

The logger of your dreams.

## Setting it up

  - `npm i -S @leisurelink/skinny-loggins`

```js
// src/logger.js
import createLoggins from '@leisurelink/skinny-loggins';
const settings = {
  // Console: { /* are defaulted */ },
  // Logstash: { host: '', port: 28777 }
}
export default createLoggins(settings);
```

```js
// src/magicbus.js
import nameLogger from './path/to/logger';
const logger = nameLogger('magicbus');

logger.info('Message Sent'); // MM/DD/YYYY HH:mm:ss UTC info: magicbus: "Message Sent"
```

## Logging levels

These are the current logging levels:

  - silly    - 1
  - debug    - 2
  - verbose  - 3
  - info     - 4
  - warn     - 5
  - error    - 6

`logger.log()` is a special case where you can specify the level to which you should log.

```js
logger.log('debug', 'Here is my debug message');
logger.log('info', 'Here is my info message');
// ....

logger.silly('Here is my silly message');
logger.debug('Here is my debug message');
logger.verbose('Here is my verbose message');
logger.info('Here is my info message');
logger.warn('Here is my warn message');
logger.error('Here is my error message');
```

## Adding and removing transports

Adding defaults is simple. The only caveat is that currently you can only add supported transports.

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

## Transports and their defaults

If you new up a logger but don't specify a transport for it to log on, these are the defaults.

### Console

#### Defaults

```js
{
  level: 'info',
  silent: false,
  colorize: true,
  timestamp: true,
  json: true,
  stringify: true,
  humanReadableUnhandledException: true,
  showLevel: true,
  stderrLevels: [ 'error', 'debug' ]
}
```

### logstash

The logstash information is not defaulted as this should be specified from the environment.
The properties required are:

  - host
  - port -- this will default to 2877


#### Defaults

```js
{
  host: '<specified host>', // Required
  port: 28777,
  logstash: true,
  ssl_enable: false,
  rejectUnauthorized: false,
  strip_colors: false
}
```

### File

#### Defaults

```js
{
  level: 'info',
  filename: 'logs.log',
  maxsize: 5242880,
  maxFiles: 5,
  json: true,
  eol: '\n',
  logstash: true,
  showLevel: true,
  options: { flags: 'a' }
}
```

## consumeFrom

Many of LeisureLink's modules use an event logging pattern to publish events for any logger to consume. One example of this is @leisurelink/skinny-event-loggins. The consumeFrom method is for convenience in integrating these log events into your logging configuration. The consumeFrom expects a component argument with an `on` function that can be used to subscribe to `log` events. These events should have this structure:

```js
{
  kind: 'info',
  message: 'howdy',
  namespace: 'component',
  err: new Error('Badness')
}
```

### Example

```js
// src/logger.js
import createLoggins from '@leisurelink/skinny-loggins';
import component from './configured-component';
const settings = {
  // Console: { /* are defaulted */ },
  // Logstash: { host: '', port: 28777 }
}
let logger = createLoggins(settings);
logger.consumeFrom(component);
export default logger;

// src/component.js
import createEventLogger from '@leisurelink/skinny-event-loggins';
let logger = createEventLogger('component');
export default {
  work: () => { logger.info('Work started'); },
  on: (ev, handler) => { logger.on(ev, handler); }
};
```
