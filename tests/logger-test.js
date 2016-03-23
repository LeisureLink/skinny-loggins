import { expect } from 'chai';
import Loggins from '../src';

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

    it('does not throw an exception on logger.debug', () => {
      expect(() =>{
        logger.debug('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.warn', () => {
      expect(() =>{
        logger.warn('test');
      }).to.not.throw();
    });

    it('does not throw an exception on logger.error', () => {
      expect(() =>{
        logger.error('test');
      }).to.not.throw();
    });
  });
});
