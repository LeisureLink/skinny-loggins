import schemas from '../../src/schemas';
import schema from '../../src/schemas/logging-levels';
import { expect } from 'chai';

describe('logging levels', () =>{
  it('allows silly', () =>{
    expect(() =>{
      schemas.validate('silly', schema);
    }).to.not.throw();
  });

  it('allows debug', () =>{
    expect(() =>{
      schemas.validate('debug', schema);
    }).to.not.throw();
  });

  it('allows verbose', () =>{
    expect(() =>{
      schemas.validate('verbose', schema);
    }).to.not.throw();
  });

  it('allows info', () =>{
    expect(() =>{
      schemas.validate('info', schema);
    }).to.not.throw();
  });

  it('allows warn', () =>{
    expect(() =>{
      schemas.validate('warn', schema);
    }).to.not.throw();
  });

  it('allows error', () =>{
    expect(() =>{
      schemas.validate('error', schema);
    }).to.not.throw();
  });

  it('does not allow any other option', () =>{
    expect(() =>{
      schemas.validate('broken', schema);
    }).to.throw(/must be one of/);
  });
});
