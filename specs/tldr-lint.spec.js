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
    expect(containsOnlyErrors(errors, 'TLDR002')).toBeTruthy();
    // This error should occur in 3 different places
    expect(errors.length).toBe(3);
  });

  it("TLDR003\t" + linter.ERRORS.TLDR003, function() {
    var errors = lintFile('pages/003.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR003')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR004\t" + linter.ERRORS.TLDR004, function() {
    var errors = lintFile('pages/004.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR004')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR005\t" + linter.ERRORS.TLDR005, function() {
    var errors = lintFile('pages/005.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR005')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR006\t" + linter.ERRORS.TLDR006, function() {
    var errors = lintFile('pages/006.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR006')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR007\t" + linter.ERRORS.TLDR007, function() {
    var errors = lintFile('pages/007.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR007')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR008\t" + linter.ERRORS.TLDR008, function() {
    var errors = lintFile('pages/008.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR008')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR009\t" + linter.ERRORS.TLDR009, function() {
    var errors = lintFile('pages/009.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR009')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR011\t" + linter.ERRORS.TLDR011, function() {
    var errors = lintFile('pages/011.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR011')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR012\t" + linter.ERRORS.TLDR012, function() {
    var errors = lintFile('pages/012.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR012')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR013\t" + linter.ERRORS.TLDR013, function() {
    var errors = lintFile('pages/013.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR013')).toBeTruthy();
    expect(errors.length).toBe(1);
  });
});
