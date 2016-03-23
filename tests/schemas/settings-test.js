import { expect } from 'chai';
import schema from '../../src/schemas/settings';
import { validate } from '../../src/schemas';

describe('Skinny Loggins Settings Schema', () =>{
  let model;
  beforeEach(() =>{
    model = { };
  });

  it('does not throw when a valid model is passed', () =>{
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('validates logging levels', () =>{
    model.level = 'willNeverBeALevel';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"level" must be one of');
  });

  it('enforces transport validation', () =>{
    model.transports = {
      console: {
        level: 'nope'
      }
    };
    expect(() => {
      validate(model, schema);
    }).to.throw('"level" must be one of');
  });
});
