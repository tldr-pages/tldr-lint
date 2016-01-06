parser = require('tldr-parser.js').parser

module.exports = function(page) {
  var result = parser.parse(input);
  console.log(result);
  return result;
};
