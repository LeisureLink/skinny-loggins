import joi from 'joi';
import schemas from '../../src/schemas';
import { expect } from 'chai';

describe('schemas.validate()', () =>{
  let schema, obj;

  before(() =>{
    schema = joi.object({
      name: joi.string().required(),
      age: joi.number()
    });
  });

  beforeEach(() =>{
    obj = {
      name: 'bob',
      age: 5
    };
  });

  it('throws an exception if an object does not meet validation', () =>{
    obj.name = undefined;
    expect(() =>{
      schemas.validate(obj, schema);
    }).to.throw(/is required/);
  });

  it('does not throw when a valid schema is provided', () =>{
    expect(() =>{
      schemas.validate(obj, schema);
    }).to.not.throw();
  });

  it('returns the value', () =>{
    let result = schemas.validate(obj, schema);
    expect(result).to.be.ok;
  });

  it('strips unknown props', () =>{
    obj.gender = 'other';
    let result = schemas.validate(obj, schema);
    expect(result).to.not.have.property('gender');
  });
});
