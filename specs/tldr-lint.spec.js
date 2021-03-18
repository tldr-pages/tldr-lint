/* eslint-disable no-magic-numbers */

var linter = require('../lib/tldr-lint.js');
var { lintFile, containsErrors, containsOnlyErrors } = require('./tldr-lint-helper');

function parameterizedTests(testParams) {
  testParams.forEach(function ([errNum, length, expectedErrors, fileName]) {
    var tldrError = `TLDR${errNum}`;
    it(`${tldrError}\t${linter.ERRORS[tldrError]}`, function () {
      var errors = lintFile(`pages/failing/${fileName ? fileName : `${errNum}.md`}`).errors;
      if (expectedErrors) {
        expect(containsErrors(errors, expectedErrors)).toBeTruthy();
      } else {
        expect(containsOnlyErrors(errors, tldrError)).toBeTruthy();
      }

      expect(errors.length).toBe(length || 1);
    });
  });
}

describe('TLDR conventions', function() {
  parameterizedTests([
    ['001'],
    ['002', 3],
    ['003'],
    ['004', 4, ['TLDR004', 'TLDR014']],
    ['005', 2],
    ['006'],
    ['007', 2],
    ['008'],
    ['009'],
    ['010', 6],
    ['011', 2],
    ['012', 2],
    ['013'],
    ['014', 5],
    ['015'],
    ['016'],
    ['017'],
    ['018', 2],
    ['019', 1],
  ]);
});

describe('Common TLDR formatting errors', function() {
  parameterizedTests([
    ['101'],
    ['102'],
    ['103', 2],
    ['104', 2],
    ['105', 2],
    ['106'],
    ['107', 1, undefined, '107'],
    ['108', 1, undefined, '108 .md'],
    ['109', 1, undefined, '109A.md'],
  ]);

});

describe('TLDR pages that are simply correct', function() {
  [
    ['Multiple description lines', 'descriptions'],
    ['Example starting with a bracket', 'bracket'],
    ['Page filename and title includes + symbol', 'title++']
  ].forEach(function ([testName, fileName]) {
    it(testName, function () {
      var errors = lintFile(`pages/passing/${fileName}.md`).errors;
      expect(errors.length).toBe(0);
    });
  });
});
