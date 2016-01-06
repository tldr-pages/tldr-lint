parser = require('./tldr-parser').parser

module.exports = function(page) {
  var result = parser.parse(page);
  console.log(result);
  return result;
};
