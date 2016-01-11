parser = require('./tldr-parser').parser;

DEBUG_MODE = true;

module.exports.ERRORS = parser.ERRORS = {
  'TLDR001': 'Missing space before title.'
};

(function(parser) {
  // Prepares state for a single page. Should be called before a run.
  parser.init = function() {
    this.yy.errors = []
    this.yy.page = {
      description: [],    // can be multiple lines
      examples: []
    };
  };
  parser.ERRORS = parser.yy.ERRORS = {
    'TLDR001': 'Missing space before title.'
  }
  parser.yy.error = function(location, error) {
    if (!parser.ERRORS[error]) {
      throw new Error("Linter done goofed. '" + error + "' does not exist.");
    }
    parser.yy.errors.push({
      locinfo: location,
      code: error,
      description: parser.ERRORS[error]
    });
  };
  parser.yy.setTitle = function(title) {
    parser.yy.page.title = title;
  };
  parser.yy.addDescription = function(description) {
    parser.yy.page.description.push(description);
  };
  parser.yy.addExample = function(description, command) {
    parser.yy.page.examples.push({
      description: description,
      command: command
    })
  };
  parser.yy.initLexer = function(lexer) {
    lexer.pushState = function(key, condition) {
      lexer.conditions[key] = condition;
      lexer.conditionStack.push(key);
    }
  };
})(parser);


module.exports = function(page) {
  parser.init();
  var result = parser.parse(page);
  if (DEBUG_MODE) {
    console.log(parser.yy.page.description.length + " line(s) of description");
    console.log(parser.yy.page.examples.length + " examples");
  }
  parser.yy.errors.forEach(function(error) {
    
  });
  // TODO add error when filename doesn't match page title
  return parser.yy.errors;
};
