const assert = require('assert');
const sinon = require('sinon');

const tagParser = require('../src/tag-parser');

describe('tagParser()', () => {
  context('on falsy argument', () => {
    it('should return null on undefined', () => {
      const tag = undefined;
      assert.strictEqual(tagParser(tag), null);
    });
    it('should return null on null', () => {
      const tag = null;
      assert.strictEqual(tagParser(tag), null);
    });
    it('should return null on empty string', () => {
      const tag = '';
      assert.strictEqual(tagParser(tag), null);
    });
  });

  context('on unweighted possibly untrimmed tag ("__deflate_")', () => {
    let actualTag;
    const givenTag = '  deflate ';
    const factorParserSpy = sinon.spy();

    beforeEach(() => {
      actualTag = tagParser(givenTag, factorParserSpy);
    });

    it(`shouldn't call the factorParser()`, () => {
      sinon.assert.notCalled(factorParserSpy);
    });
    it('should return the trimmed tag name', () => {
      assert.equal(actualTag.tagName, givenTag.trim());
    });
    it('should return qValue = 1', () => {
      assert.equal(actualTag.qValue, 1);
    });
  });

  context('on weighted tag ("deflate; q=0.9")', () => {
    const givenFactor = ' q=test ';
    const givenTagName = ' deflate  ';
    const givenTag = `${givenTagName};${givenFactor}`;
    let actualTag;

    it('should call the factorParser with given q-factor (trimmed)', () => {
      const factorParserSpy = sinon.spy();
      tagParser(givenTag, factorParserSpy);
      sinon.assert.calledWith(factorParserSpy, givenFactor.trim());
    });

    context('when the factorParser returns a value', () => {
      const givenFactor = ' q=test ';
      const givenTagName = ' deflate  ';
      const givenTag = `${givenTagName};${givenFactor}`;
      const expectedQvalue = 0.9;
      const factorParserStub = qFactor => expectedQvalue;
      let actualTag;

      beforeEach(() => {
        actualTag = tagParser(givenTag, factorParserStub);
      })

      it('should return the tag.tagName trimmed', () => {
        assert.equal(actualTag.tagName, givenTagName.trim());
      });

      it('should return the tag.qValue of provided value', () => {
        assert.equal(actualTag.qValue, expectedQvalue);
      });
    });

    context('when the factorParser throws an error', () => {
      it('should return null', () => {
        const factorParserStub = qFactor => { throw new Error() };
        const actualTag = tagParser('anyTag;anyFactor', factorParserStub);
        assert.equal(actualTag, null);
      });
    });
  });
});
