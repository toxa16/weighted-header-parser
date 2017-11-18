const assert = require('assert');
const sinon = require('sinon');

const rawTagsParser = require('../src/raw-tags-parser');

describe('rawTagsParser()', () => {

  context('on falsy argument', () => {
    const rawTags = undefined;
    it('should return empty array []', () => {
      assert.deepEqual(rawTagsParser(rawTags, null), []);
    });
    it(`shouldn't call the tagParser()`, () => {
      const tagParserSpy = sinon.spy();
      rawTagsParser(rawTags, tagParserSpy);
      sinon.assert.notCalled(tagParserSpy);
    });
  });

  context('on single tag', () => {
    const givenRawTag = 'tag1';
    
    it('should call the tagParser() with the given tag as argument', () => {
      const tagParserSpy = sinon.spy();
      rawTagsParser(givenRawTag, tagParserSpy);
      sinon.assert.calledWith(tagParserSpy, givenRawTag);
    });

    context('when the tagParser() returns a value', () => {
      it('should return an array with the value from the tagParser()', () => {
        const tagParserReturnValue = { name: 'test' };
        const tagParserStub = tag => tagParserReturnValue;
        const actual = rawTagsParser(givenRawTag, tagParserStub);
        assert.deepEqual(actual, [tagParserReturnValue]);
      });
    });
    context('when the tagParser() returns null', () => {
      it('should return an empty array', () => {
        const tagParserStub = tag => null;
        const actual = rawTagsParser(givenRawTag, tagParserStub);
        assert.deepEqual(actual, []);
      });
    });
  });

  context('on three tags', () => {
    const givenTagsArray = ['tag1', 'tag2', 'tag3'];
    const givenRawTags = givenTagsArray.join(' , ');

    it('should call the tagParser() thrice', () => {
      const tagParserSpy = sinon.spy();
      rawTagsParser(givenRawTags, tagParserSpy);
      sinon.assert.calledThrice(tagParserSpy);
    });

    it('should return an array of values returned by the tagParser()', () => {
      const expectedValues = [
        { tagName: 'tag1', qValue: 1 },
        { tagName: 'tag2', qValue: 0.5 },
        { tagName: 'tag3', qValue: 0.9 },
      ];
      const tagParserReturnsTable = {
        [givenTagsArray[0]]: expectedValues[0],
        [givenTagsArray[1]]: expectedValues[1],
        [givenTagsArray[2]]: expectedValues[2],
      };
      const tagParserStub = tag => tagParserReturnsTable[tag];
      const actual = rawTagsParser(givenRawTags, tagParserStub);
      assert.deepEqual(actual, expectedValues);
    });
  });

});
