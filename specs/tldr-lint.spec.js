var linter = require('../lib/tldr-lint.js');
var fs = require('fs');
var path = require('path');

var page_dir = './pages';

describe("TLDR conventions", function() {
  it("TLDR001\t" + linter.ERRORS.TLDR001, function() {
    var errors = lintFile('pages/001.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR001')).toBeTruthy();
  });
  it("TLDR002\t" + linter.ERRORS.TLDR002, function() {
    var errors = lintFile('pages/002.md').errors;
    expect(containsErrors(errors, 'TLDR002')).toBeTruthy();
    // This error should occur in 3 different places
    expect(errors.length).toBe(3);
  });
});
