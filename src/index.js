const rawTagsParser = require('./raw-tags-parser');

function weightedHeaderParser(header) {
  const weightedTags = rawTagsParser(header);
  weightedTags.sort((a, b) => (a.qValue < b.qValue) ? 1 : -1);
  const tags = [];
  weightedTags.map(x => tags.push(x.tagName));
  return tags;
}

module.exports = weightedHeaderParser;
