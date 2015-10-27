'use strict';
var chai = require('chai');
var expect = chai.expect;
var Loggins = require('../index');

describe('loggins', function(){
  it("doesn't throw any exceptions for new object", function(){
    expect(function(){
      new Loggins();
    }).to.not.throw();
  });

  describe('defaults', function(){
    var logger;
    beforeEach(function(){
      logger = new Loggins();
    });

    it('defaults console as a transport', function(){
      expect(logger.transports.console).to.be.ok;
    });

    describe('Console transport', function(){
      it('has the defaults set from transport-defaults', function(){
        var consl = logger.transports.console;
        expect(consl).to.have.property('timestamp').and.to.equal(true);
        expect(consl).to.have.property('prettyPrint').and.to.equal(true);
        expect(consl).to.have.property('depth').and.to.equal(null);
        expect(consl).to.have.property('level').and.to.equal('info');
        expect(consl).to.have.property('handleExceptions').and.to.equal(true);
        expect(consl).to.have.property('colorize').and.to.equal(true);
      });
    });
  });

  describe('options', function(){

    describe('One without the other', function(){
      it("doesn't specify file if console is specified",function(){
        var logger = new Loggins({ console: {} });
        expect(logger.transports).to.not.have.property('file');
      });
      it("doesn't specify console if file is specified", function(){
        var logger = new Loggins({ file: {} });
        expect(logger.transports).to.not.have.property('console');
      });
    });

    describe('file', function(){
      it('sets the filename to lol.log', function(){
        var logger = new Loggins({ file: { filename: 'lol.log' } });
        var file = logger.transports.file;
        expect(file).to.have.property('filename').and.to.equal('lol.log');
      });
    });

    describe('console', function(){
      it('sets the prettyPrint to false', function(){
        var logger = new Loggins({ console: { prettyPrint: false } });
        var consl = logger.transports.console;
        expect(consl).to.have.property('prettyPrint').and.to.equal(false);
      });
    });
  });
});
