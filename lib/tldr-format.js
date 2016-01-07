var parser = require('./tldr-forgiving-parser.js');

(function(parser) {
  // Prepares state for a single page. Should be called before a run.
  parser.init = function() {
    this.yy.page = {
      description: [],    // can be multiple lines
      examples: []
    };
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
})(parser);

var forgiving = module.exports;

forgiving.parse = function(page) {
  parser.init();
  parser.parse(page);
  return parser.page;
};

forgiving.toString = function(parsedPage) {

};

forgiving.format = function(page) {
  return forgiving.toString(forgiving.parse(page))
};
