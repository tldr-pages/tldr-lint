var parser = require('./tldr-forgiving-parser.js').parser;
var util = require('util');

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
  parser.yy.addExample = function(description, commands) {
    parser.yy.page.examples.push({
      description: description,
      commands: commands
    })
  };
})(parser);

var formatter = module.exports;

formatter.parse = function(page) {
  parser.init();
  parser.parse(page);
  return parser.yy.page;
};

formatter.formatDescription = function(str) {
  return str[0].toUpperCase() + str.slice(1) + '.';
};

formatter.formatExampleDescription = function(str) {
  return str[0].toUpperCase() + str.slice(1) + ':';
}

formatter.toString = function(parsedPage) {
  var str = ''
  str += util.format(`# ${parsedPage.title}`);
  str += '\n\n';
  parsedPage.description.forEach(function(line) {
    str += util.format(`> ${formatter.formatDescription(line)}`);
    str += '\n';
  });
  parsedPage.examples.forEach(function(example) {
    str += '\n';
    str += util.format(`- ${formatter.formatExampleDescription(example.description)}`);
    str += '\n\n';
    example.commands.forEach(function(command) {
      str += util.format(`\`${command}\``);
      str += '\n';
    });
  })
  return str;
};

formatter.format = function(page) {
  return formatter.toString(formatter.parse(page))
};
