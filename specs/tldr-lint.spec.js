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
    expect(containsErrors(errors, ['TLDR004', 'TLDR014'])).toBeTruthy();
    expect(errors.length).toBe(4);
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

  it("TLDR014\t" + linter.ERRORS.TLDR014, function() {
    var errors = lintFile('pages/014.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR014')).toBeTruthy();
    expect(errors.length).toBe(3);
  });
});

describe("Common TLDR formatting errors", function() {
  it("TLDR101\t" + linter.ERRORS.TLDR101, function() {
    var errors = lintFile('pages/101.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR101')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR102\t" + linter.ERRORS.TLDR102, function() {
    var errors = lintFile('pages/102.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR102')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR103\t" + linter.ERRORS.TLDR103, function() {
    var errors = lintFile('pages/103.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR103')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR104\t" + linter.ERRORS.TLDR104, function() {
    var errors = lintFile('pages/104.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR104')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR105\t" + linter.ERRORS.TLDR105, function() {
    var errors = lintFile('pages/105.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR105')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR106\t" + linter.ERRORS.TLDR106, function() {
    var errors = lintFile('pages/106.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR106')).toBeTruthy();
    expect(errors.length).toBe(1);
  });
});

describe("TLDR pages that are simply correct", function() {
  it("Multiple description lines", function() {
    var errors = lintFile('pages/descriptions.md').errors;
    expect(errors.length).toBe(0);
  });

  // deprecated
  xit("Multiple example lines", function() {
    var errors = lintFile('pages/examples.md').errors;
    expect(errors.length).toBe(0);
  });
});


