var linter = require('../lib/tldr-lint.js');
var path = require('path');

var lintFile = function(file) {
  return linter.processFile(path.join(__dirname, file));
};

var containsErrors = function(errors, expected) {
  if (errors.length === 0) return false;
  if (!(expected instanceof Array))
    expected = Array.prototype.splice.call(arguments, 1);
  expected.forEach(function(expectedCode) {
    // If not some correspond to every expected, false
    if (!errors.some(function(error) { return error === expectedCode; }))
      return false;
  });
  return true;
};

var containsOnlyErrors = function(errors, expected) {
  if (!(expected instanceof Array)) {
    expected = Array.prototype.splice.call(arguments, 1);
  }
  expected.forEach(function(error) {
    if (!containsErrors(errors, error)) {
      console.error('Couldnt find error', error, 'in these errors');
      console.error(errors);
      return false;
    }
  });
  for (var i = 0; i < errors.length; i++) {
    var error = errors[i];
    if (!expected.some(function(expectedCode) {
      return error.code === expectedCode;
    })) {
      return false;
    }
  }
  return true;
};

module.exports = {
  lintFile,
  containsErrors,
  containsOnlyErrors,
};
