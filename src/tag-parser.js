const qFactorParser = require('./q-factor-parser');

function tagParser(tag, factorParser = qFactorParser) {
  if (!tag) {
    return null;
  } else {
    const splitted = tag.split(';');
    const tagName = splitted[0].trim();
    const qFactor = splitted[1];

    let qValue;
    if (qFactor) {
      try {
        qValue = factorParser(qFactor.trim());
      } catch(err) {
        return null;
      }
    } else {
      qValue = 1;
    }

    const weightedTag = { tagName, qValue };
    return weightedTag;
  }
}

module.exports = tagParser;
