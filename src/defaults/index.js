import consoleTransport from './console-transport';
import fileTransport from './file-transport';
import logstashTransport from './logstash-transport';

export default {
  Console: consoleTransport,
  File: fileTransport,
  Logstash: logstashTransport
};
