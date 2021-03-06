import defaults from '../../../src/defaults/console-transport';
import schema from '../../../src/schemas/transports/console-transport';
import { expect } from 'chai';
import { validate } from '../../../src/schemas';

describe('Console transport schema', () =>{
  let model;
  beforeEach(() =>{
    model = { };
  });

  it('does not throw an exception on a valid model', () =>{
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('validates invalid logging levels', () =>{
    model.level = 'nope';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"level" must be one of');
  });

  it('returns a defaulted config object', () =>{
    let obj = validate(model, schema);

    expect(obj).to.eql({
      colorize: defaults.colorize,
      humanReadableUnhandledException: true,
      json: false,
      level: 'info',
      showLevel: true,
      silent: false,
      stderrLevels: ['error', 'debug'],
      stringify: true,
      prettyPrint: false
    });
  });

  it('allows prettyprint to be a function', () =>{
    model.prettyPrint = () =>{};
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('allows prettyPrint to be a boolean', () =>{
    model.prettyPrint = false;
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('allows prettyPrint to be a function but does not override to boolean', () =>{
    model.prettyPrint = () =>{};
    let obj = validate(model, schema);
    expect(obj.prettyPrint).to.be.a('function');
  });
});
