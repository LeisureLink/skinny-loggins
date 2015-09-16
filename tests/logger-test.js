'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('loggins', function(){
  var logger;
  before(function(){
    logger = require('../lib');
  });

  afterEach(function(){
    logger.transports = {};
  });

  describe('defaults', function(){
    beforeEach(function(){
      logger.init();
    });

    afterEach(function(){
      logger.transports = {};
    });

    it('should set up defaults for file logger when no settings are supplied', function(){
      var transports = logger.transports;
      expect(transports.file).to.have.property('filename').that.equals('all-logs.log');
    });

    it('should set up defaults for console logger when no settings are supplied', function(){
      var transports = logger.transports;
      expect(transports.console).to.have.property('prettyPrint').that.equals(true);
    });
  });

  describe('overriding', function(){
    afterEach(function(){
      logger.transports = {};
    });

    it('should override the default filename for file', function(){
      logger.init({ file: { filename: 'lol.log' } });
      var file = logger.transports.file;
      expect(file.filename).to.equal('lol.log');
    });

    it('should only have console if console is specified', function(){
      logger.init({ console: {} });
      var transports = logger.transports;
      expect(transports).to.have.property('console');
      expect(transports).to.not.have.property('file');
    });
  });
});
