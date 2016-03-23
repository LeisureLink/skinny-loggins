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
      prettyPrint: false,
      showLevel: true,
      silent: false,
      colorize: false,
      timestamp: true
    });
  });

  it('allows prettyprint to be a function', () =>{
    model.prettyPrint = () =>{};
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('allows prettyPrint to be a boolean', () =>{
    model.prettyPrint = true;
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('allows timestamp to be a function', () =>{
    model.timestamp = () =>{};
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('allows timestamp to be a boolean', () =>{
    model.timestamp = true;
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('does not allow depth if prettyprint is false', () =>{
    model.prettyPrint = false;
    model.depth = 4;
    expect(() =>{
      validate(model, schema);
    }).to.throw('"depth" is not allowed');
  });

  it('allows depth if prettyprint is true', () =>{
    model.prettyPrint = true;
    model.depth = 4;
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('does not allow formatter if json is true', () =>{
    model.formatter = () =>{};
    expect(() =>{
      validate(model, schema);
    }).to.throw('"formatter" is not allowed');
  });

  it('allows formatter if json is false', () =>{
    model.json = false;
    model.formatter = () =>{};
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
