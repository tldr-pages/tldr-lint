var linter = require('../lib/tldr-lint.js');

describe("TLDR conventions", function() {
  it("TLDR001\t" + linter.ERRORS.TLDR001, function() {
    var errors = lintFile('pages/failing/001.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR001')).toBeTruthy();
  });

  it("TLDR002\t" + linter.ERRORS.TLDR002, function() {
    var errors = lintFile('pages/failing/002.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR002')).toBeTruthy();
    // This error should occur in 3 different places
    expect(errors.length).toBe(3);
  });

  it("TLDR003\t" + linter.ERRORS.TLDR003, function() {
    var errors = lintFile('pages/failing/003.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR003')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR004\t" + linter.ERRORS.TLDR004, function() {
    var errors = lintFile('pages/failing/004.md').errors;
    expect(containsErrors(errors, ['TLDR004', 'TLDR014'])).toBeTruthy();
    expect(errors.length).toBe(4);
  });

  it("TLDR005\t" + linter.ERRORS.TLDR005, function() {
    var errors = lintFile('pages/failing/005.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR005')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR006\t" + linter.ERRORS.TLDR006, function() {
    var errors = lintFile('pages/failing/006.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR006')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR007\t" + linter.ERRORS.TLDR007, function() {
    var errors = lintFile('pages/failing/007.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR007')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR008\t" + linter.ERRORS.TLDR008, function() {
    var errors = lintFile('pages/failing/008.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR008')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR009\t" + linter.ERRORS.TLDR009, function() {
    var errors = lintFile('pages/failing/009.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR009')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR011\t" + linter.ERRORS.TLDR011, function() {
    var errors = lintFile('pages/failing/011.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR011')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR012\t" + linter.ERRORS.TLDR012, function() {
    var errors = lintFile('pages/failing/012.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR012')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR013\t" + linter.ERRORS.TLDR013, function() {
    var errors = lintFile('pages/failing/013.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR013')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR014\t" + linter.ERRORS.TLDR014, function() {
    var errors = lintFile('pages/failing/014.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR014')).toBeTruthy();
    expect(errors.length).toBe(5);
  });

  it("TLDR015\t" + linter.ERRORS.TLDR015, function() {
    var errors = lintFile('pages/failing/015.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR015')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR016\t" + linter.ERRORS.TLDR016, function() {
    var errors = lintFile('pages/failing/016.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR016')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR017\t" + linter.ERRORS.TLDR017, function() {
    var errors = lintFile('pages/failing/017.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR017')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR018\t" + linter.ERRORS.TLDR018, function() {
    var errors = lintFile('pages/failing/018.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR018')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR019\t" + linter.ERRORS.TLDR019, function() {
    var errors = lintFile('pages/failing/019.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR019')).toBeTruthy();
    expect(errors.length).toBe(1);
  });
});

describe("Common TLDR formatting errors", function() {
  it("TLDR101\t" + linter.ERRORS.TLDR101, function() {
    var errors = lintFile('pages/failing/101.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR101')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR102\t" + linter.ERRORS.TLDR102, function() {
    var errors = lintFile('pages/failing/102.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR102')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR103\t" + linter.ERRORS.TLDR103, function() {
    var errors = lintFile('pages/failing/103.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR103')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR104\t" + linter.ERRORS.TLDR104, function() {
    var errors = lintFile('pages/failing/104.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR104')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR105\t" + linter.ERRORS.TLDR105, function() {
    var errors = lintFile('pages/failing/105.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR105')).toBeTruthy();
    expect(errors.length).toBe(2);
  });

  it("TLDR106\t" + linter.ERRORS.TLDR106, function() {
    var errors = lintFile('pages/failing/106.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR106')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR107\t" + linter.ERRORS.TLDR107, function() {
    var errors = lintFile('pages/failing/107').errors;
    expect(containsOnlyErrors(errors, 'TLDR107')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR108\t" + linter.ERRORS.TLDR108, function () {
    var errors = lintFile('pages/failing/108 .md').errors;
    expect(containsOnlyErrors(errors, 'TLDR108')).toBeTruthy();
    expect(errors.length).toBe(1);
  });

  it("TLDR109\t" + linter.ERRORS.TLDR109, function () {
    var errors = lintFile('pages/failing/109A.md').errors;
    expect(containsOnlyErrors(errors, 'TLDR109')).toBeTruthy();
    expect(errors.length).toBe(1);
  });
});

describe("TLDR pages that are simply correct", function() {
  it("Multiple description lines", function() {
    var errors = lintFile('pages/passing/descriptions.md').errors;
    expect(errors.length).toBe(0);
  });

  it("Example starting with a bracket", function() {
    var errors = lintFile('pages/passing/bracket.md').errors;
    expect(errors.length).toBe(0);
  });

  it("Page filename and title includes + symbol", function() {
    var errors = lintFile('pages/passing/title++.md').errors;
    expect(errors.length).toBe(0);
  });
});
