const assert = require('assert');

const qFactorParser = require('../src/q-factor-parser');

describe('qFactorParser()', () => {

  it('should return 1 on undefined', () => {
    const qFactor = undefined;
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should return 1 on null', () => {
    const qFactor = null;
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should return 1 on empty string', () => {
    const qFactor = '';
    assert.equal(qFactorParser(qFactor), 1);
  });

  it('should throw SyntaxError on random string ("a")', () => {
    const qFactor = 'a';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });
  it('should throw SyntaxError on "q="', () => {
    const qFactor = 'q=';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });

  it('should return 0 on "q=0"', () => {
    const qFactor = 'q=0';
    assert.equal(qFactorParser(qFactor), 0);
  });
  it('should return 1 on "q=1"', () => {
    const qFactor = 'q=1';
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should throw SyntaxError on "q=2"', () => {
    const qFactor = 'q=2';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });
  it('should throw SyntaxError on "q=00"', () => {
    const qFactor = 'q=00';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });

  it('should return 0 on "q=0."', () => {
    const qFactor = 'q=0.';
    assert.equal(qFactorParser(qFactor), 0);
  });
  it('should return 1 on "q=1."', () => {
    const qFactor = 'q=1.';
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should throw SyntaxError on "q=0.."', () => {
    const qFactor = 'q=0..';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });

  it('should return 0 on "q=0.0"', () => {
    const qFactor = 'q=0.0';
    assert.equal(qFactorParser(qFactor), 0);
  });
  it('should throw SyntaxError on "q=0.0."', () => {
    const qFactor = 'q=0.0.';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });

  it('should return 0.03 on "q=0.03"', () => {
    const qFactor = 'q=0.03';
    assert.equal(qFactorParser(qFactor), 0.03);
  });
  it('should return 0.038 on "q=0.038"', () => {
    const qFactor = 'q=0.038';
    assert.equal(qFactorParser(qFactor), 0.038);
  });
  it('should throw SyntaxError on "q=0.0389"', () => {
    const qFactor = 'q=0.389';
    () => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    }  });

  it('should return 1 on "q=1.0"', () => {
    const qFactor = 'q=1.0';
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should return 1 on "q=1.00"', () => {
    const qFactor = 'q=1.00';
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should return 1 on "q=1.000"', () => {
    const qFactor = 'q=1.000';
    assert.equal(qFactorParser(qFactor), 1);
  });
  it('should throw SyntaxError on "q=1.010"', () => {
    const qFactor = 'q=1.010';
    assert.throws(() => {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    });
  });

});
