import { expect } from 'chai';
import schema from '../../../src/schemas/transports/logstash-transport-schema';
import { validate } from '../../../src/schemas';

describe('logstash transport schema', () =>{
  let model;
  beforeEach(() =>{
    model = {
      level: 'info',
      host: 'local',
      port: 28777
    };
  });

  it('returns the simple expected object when valid', () =>{
    expect(() =>{
      validate(model, schema);
    }).to.not.throw();
  });

  it('throws if host is not defined', () =>{
    delete model.host;
    expect(() =>{
      validate(model, schema);
    }).to.throw('"host" is required');
  });

  it('does not allow ssl_key without ssl_enable', () =>{
    model['ssl_key'] = 'hello';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"ssl_key" is not allowed');
  });

  it('does not allow ssl_cert without ssl_enable', () =>{
    model['ssl_cert'] = 'blah';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"ssl_cert" is not allowed');
  });

  it('does not allow ssl_passphrase without ssl_enable being true', () =>{
    model['ssl_passphrase'] = 'phrase of passes';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"ssl_passphrase" is not allowed');
  });

  it('does not allow ca without ssl_enable being true', () =>{
    model['ca'] = 'cert';
    expect(() =>{
      validate(model, schema);
    }).to.throw('"ca" is not allowed');
  });

  it('requires ssl_key if ssl_enable is true', () =>{
    model['ssl_enable'] = true;
    expect(() =>{
      validate(model, schema);
    }).to.throw('"ssl_key" is required');
  });

  it('returns a defaulted object', () =>{
    let obj = validate(model, schema);
    expect(obj).to.eql({
      host: model.host,
      port: model.port,
      logstash: true,
      'ssl_enable': false,
      rejectUnauthorized: false,
      'strip_colors': false
    });
  });
});
