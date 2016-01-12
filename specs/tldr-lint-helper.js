var linter = require('../lib/tldr-lint.js');
var fs = require('fs');
var path = require('path');

var page_dir = './pages';

lintFile = function(file) {
  var page = fs.readFileSync(path.join(__dirname, file), 'utf8');
  return linter.process(page);
};

containsErrors = function(errors, expected) {
  if (!(expected instanceof Array))
    expected = Array.prototype.splice.call(arguments, 1);
  expected.forEach(function(expectedCode) {
    // If not some correspond to every expected, false
    if (!errors.some(function(error) { error === expectedCode; }))
      return false;
  });
  return true;
};

containsOnlyErrors = function(errors, expected) {
  if (!(expected instanceof Array)) {
    expected = Array.prototype.splice.call(arguments, 1);
  }
  if (expected.length != errors.length) {
    return false;
  }
  expected.forEach(function(error) {
    if (!containsErrors(errors, error)) { 
      console.error(errors)
      return false;
    };
  });
  return true;
}
