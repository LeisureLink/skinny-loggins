import { expect } from 'chai';
import Loggins from '../src';
import { EventEmitter } from 'events';

describe('loggins', () =>{
  let settings;
  beforeEach(() =>{
    settings = {
      level: 'silly',
      transports: {
        Console: {
          level: 'silly'
        }
      }
    };
  });

  it('does not throw an exception for a valid console transport and settings', () =>{
    expect(() =>{
      Loggins(settings);
    }).to.not.throw();
  });

  it('throws an exception on invalid global levels', () =>{
    settings.level = 'nope';
    expect(() =>{
      Loggins(settings);
    }).to.throw('"level" must be one of');
  });

  it('throws an exception on invalid transport levels', () =>{
    settings.transports.Console.level = 'nope';
    expect(() =>{
      Loggins(settings);
    }).to.throw('"level" must be one of');
  });

  describe('logging functions', () =>{
    let logger;
    beforeEach(() =>{
      let nameLogger = Loggins(settings);
      logger = nameLogger('test');
    });

    it('does not throw an exception on logger.log', () => {
      expect(() =>{
        logger.log('info', 'test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.silly', () => {
      expect(() =>{
        logger.silly('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.debug', () => {
      expect(() =>{
        logger.debug('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.verbose', () => {
      expect(() =>{
        logger.verbose('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.warn', () => {
      expect(() =>{
        logger.warn('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.error', () => {
      expect(() =>{
        logger.error('test', new Error('I should output'));
      }).to.not.throw();
    });
  });

  describe('#consumeFrom', () =>{
    let emitter;
    let loggins;
    before(() => {
      emitter = new EventEmitter();
      loggins = Loggins(settings);
      loggins.consumeFrom(emitter);
    });

    //should probably have a better way to verify than manually reading the output
    it('should successfully consume the log event with a namespace and error', () =>{
      emitter.emit('log', { kind: 'error', namespace: 'ns', message: 'shucks', err: new Error('darn') });
    });

    it('should successfully consume the log event with a namespace and no error', () =>{
      emitter.emit('log', { kind: 'info', namespace: 'ns', message: 'shucks' });
    });

    it('should successfully consume the log event with no namespace and an error', () =>{
      emitter.emit('log', { kind: 'error', message: 'shucks', err: new Error('darn') });
    });

    it('should successfully consume the log event with no namespace and no error', () =>{
      emitter.emit('log', { kind: 'info', message: 'shucks' });
    });
  });

  describe('namespace', ()=>{
    let loggins;
    let nameLogger;
    before(()=>{
      loggins = Loggins(settings);
    });

    it('should use the parent module name as the namespace if ns not provided', (done)=>{
      nameLogger = loggins();
      nameLogger.once('logging', (transport, level, message)=>{
        expect(message.indexOf('logger-test')).to.be.above(-1);
        done();
      });
      nameLogger.debug('hello');
    });

    it('should use the passed in modulename/namespace if provided', (done)=>{
      nameLogger = loggins('my custom namespace');
      nameLogger.once('logging', (transport, level, message)=>{
        expect(message.indexOf('my custom namespace')).to.be.above(-1);
        done();
      });
      nameLogger.debug('hello');
    });

    it('should be able to use multiple namespaces at the same time', (done)=>{
      let moduleNameLogger = loggins();
      let customNameLogger = loggins('custom');

      moduleNameLogger.once('logging', (transport, level, message)=>{
        expect(message.indexOf('logger-test')).to.be.above(-1);
      });
      moduleNameLogger.info('hello');

      customNameLogger.once('logging', (transport, level, message)=>{
        expect(message.indexOf('custom')).to.be.above(-1);
      });
      customNameLogger.info('hello');

      moduleNameLogger.once('logging', (transport, level, message)=>{
        expect(message.indexOf('logger-test')).to.be.above(-1);
        done();
      });
      moduleNameLogger.info('hello');
    });

    it('no instantiation for default namespace of module.parent', (done)=>{
      loggins.once('logging', (transport, level, message)=>{
        expect(message.indexOf('logger-test')).to.be.above(-1);
        done();
      });
      loggins.info('asdf');
    });

  });

  describe('addTransport', ()=> {
    let loggins;
    before(()=>{
      loggins = Loggins(settings);
    });

    it('should allow removing and readding transport without errors', () => {
      loggins.removeTransport('Console');
      loggins.addTransport('Console', { level: 'silly' });
    });
  });
});
