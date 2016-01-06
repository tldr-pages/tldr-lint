var cli = require('../lib/cli.js');
var linter = require('../lib/tldr-lint.js');
var fs = require('fs');
var path = require('path');

var page_dir = './pages';

describe("TLDR conventions", function() {
  it("TLDR001\tchecks for a space before the title", function() {
    var errors = lintFile('pages/001.md');
    expect(containsOnlyErrors(errors, 'TLDR001')).toBeTruthy();
  });
  it("TLDR002\tMissing space at start of sentece", function() {});
});
