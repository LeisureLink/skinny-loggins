import { expect } from 'chai';
import schema from '../../../src/schemas/transports/file-transport';
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
      eol: '\n',
      filename: 'logs.log',
      json: true,
      level: 'info',
      logstash: true,
      maxFiles: 5,
      maxsize: 5242880,
      options: {
        flags: 'a'
      },
      showLevel: true,
      silent: false,
      colorize: false
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
});
