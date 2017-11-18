function qFactorParser(qFactor) {
  if (!qFactor) {
    return 1;
  } else {
    const regexp = /^q=(0(\.[0-9]{0,3})?|1(\.0{0,3})?)$/;
    if (regexp.test(qFactor)) {
      return +qFactor.substr(2);
    } else {
      throw new SyntaxError('Malformed q-factor: ' + qFactor);
    }
  }
}

module.exports = qFactorParser;
