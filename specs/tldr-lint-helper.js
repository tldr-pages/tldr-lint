var lint = require('../lib/tldr-lint.js');
var fs = require('fs');
var path = require('path');

var page_dir = './pages';

lintFile = function(file) {
  var page = fs.readFileSync(path.join(__dirname, file), 'utf8');
  return lint(page);
};

containsErrors = function(errors, code) {
  errors.forEach(function(error) {
    if (error.code == code) return true;
  });
  return false;
};

containsOnlyErrors = function(errors, expected) {
  expected = Array.prototype.splice.call(arguments, 1);
  if (expected.length != errors.length)
    return false;
  expected.forEach(function(error) {
    if (!containsErrors(errors, error)) return false;
  });
  return true;
}
