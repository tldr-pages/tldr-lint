parser = require('./tldr-parser').parser;
util = require('util');

module.exports.ERRORS = parser.ERRORS = {
  'TLDR001': 'File should contain no leading whitespace.'
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
  parser.finish = function() {
    
  };
  parser.yy.ERRORS = parser.ERRORS;
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
  parser.yy.addExample = function(description, commands) {
    parser.yy.page.examples.push({
      description: description,
      commands: commands
    })
  };
  parser.yy.createToken = function(token) {
    return {
      type: 'token',
      content: token
    };
  };
  parser.yy.createCommandText = function(text) {
    return {
      type: 'text',
      content: text
    };
  };
  parser.yy.initLexer = function(lexer) {
    lexer.pushState = function(key, condition) {
      if (!condition) {
        condition = {
          ctx: key, 
          rules: lexer._currentRules()
        }
      }
      lexer.conditions[key] = condition;
      lexer.conditionStack.push(key);
    }
  };
})(parser);

var linter = module.exports;

linter.parse = function(page) {
  parser.init();
  parser.parse(page);
  parser.finish();
  return parser.yy.page;
};

linter.formatDescription = function(str) {
  return str[0].toUpperCase() + str.slice(1) + '.';
};

linter.formatExampleDescription = function(str) {
  return str[0].toUpperCase() + str.slice(1) + ':';
}

linter.format = function(parsedPage) {
  var str = '';
  str += util.format(`# ${parsedPage.title}`);
  str += '\n\n';
  parsedPage.description.forEach(function(line) {
    str += util.format(`> ${linter.formatDescription(line)}`);
    str += '\n';
  });
  parsedPage.examples.forEach(function(example) {
    str += '\n';
    str += util.format(`- ${linter.formatExampleDescription(example.description)}`);
    str += '\n\n';
    example.commands.forEach(function(command) {

      str += '`';
      command.forEach(function(textOrToken) {
        str += textOrToken.type === 'token' ? util.format(`{{${textOrToken.content}}}`) : textOrToken.content;
      })
      str += '`\n';
    });
  });
  return str;
};

linter.process = function(page, verbose, alsoFormat) {
  var page = linter.parse(page);
  if (verbose) {
    console.log(parser.yy.page.description.length + " line(s) of description");
    console.log(parser.yy.page.examples.length + " examples");
  }
  // TODO add error when filename doesn't match page title

  var result = {
    page: parser.yy.page,
    errors: parser.yy.errors
  };
  if (alsoFormat)
    result.formatted = linter.format(parser.yy.page);

  return result;

};
