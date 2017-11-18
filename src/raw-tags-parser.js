const prodTagParser = require('./tag-parser');

function rawTagsParser(rawTags, tagParser = prodTagParser) {
  if (!rawTags) {
    return [];
  } else {
    const tags = rawTags.split(',');
    const parsedTags = [];
    for (let tag of tags) {
      const parsedTag = tagParser(tag.trim());
      parsedTag && parsedTags.push(parsedTag);
    }
    return parsedTags;
  }
}

module.exports = rawTagsParser;
