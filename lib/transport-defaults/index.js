'use strict';
import consoleTransport from './console';
import fileTransport from './file';

export default {
  console: consoleTransport,
  file: fileTransport
};
