import schemas from '../../src/schemas';
import schema from '../../src/schemas/supported-transports';
import { expect } from 'chai';

describe('logging levels', () =>{
  it('allows [Ff]ile', () =>{
    expect(() =>{
      schemas.validate('File', schema);
    }).to.not.throw();
  });

  it('allows [Cc]onsole', () =>{
    expect(() =>{
      schemas.validate('Console', schema);
    }).to.not.throw();
    expect(() =>{
      schemas.validate('console', schema);
    }).to.not.throw();
  });

  it('allows [Hh]ttp', () =>{
    expect(() =>{
      schemas.validate('Http', schema);
    }).to.not.throw();
    expect(() =>{
      schemas.validate('http', schema);
    }).to.not.throw();
  });

  it('allows [Ll]ogstash', () =>{
    expect(() =>{
      schemas.validate('logstash', schema);
    }).to.not.throw();
    expect(() =>{
      schemas.validate('Logstash', schema);
    }).to.not.throw();
  });

  it('does not allow for any other option', () =>{
    expect(() =>{
      schemas.validate('google', schema);
    }).to.throw(/fails to match the required pattern/);
  });
});
