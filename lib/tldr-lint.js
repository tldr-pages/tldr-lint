parser = require('./tldr-parser.js').parser;
util = require('util');

var MAX_DESCRIPTION_LINES = 3;
var MAX_EXAMPLES = 6;

module.exports.ERRORS = parser.ERRORS = {
  'TLDR001': 'File should contain no leading whitespace',
  'TLDR002': 'A single space should precede a sentence',
  'TLDR003': 'Descriptions should start with a capital letter',
  'TLDR004': 'Command descriptions should end in a period',
  'TLDR005': 'Example descriptions should end in a colon',
  'TLDR006': 'Command name and description should be separated by an empty line',
  'TLDR007': 'Example descriptions should be surrounded by empty lines',
  'TLDR008': 'File should contain no trailing whitespace',
  'TLDR009': 'Page should contain a newline at end of file',
  'TLDR010': 'Only Unix-style line endings allowed',
  'TLDR011': 'Page never contains more than a single empty line',
  'TLDR012': 'Page should contains no tabs',
  'TLDR013': 'Title should be alphanumeric with dashes, underscores or spaces',

  'TLDR101': 'Command description should start with a `>`',
  'TLDR102': 'Example description should start with a dash (`-`)',
  'TLDR103': 'Command example is missing its closing backtick',
  'TLDR104': 'Example descriptions should prefer infinitive tense (e.g. write) over present (e.g. writes) or gerund (e.g. writing)',
  'TLDR106': 'Page title should start with a hash (`#`)',
  'TLDR107': 'Page should contain no more than ' + MAX_EXAMPLES + ' examples',
  'TLDR108': 'Page should contain no more than ' + MAX_DESCRIPTION_LINES + ' lines of description'
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
  parser.yy.addDescription = function(description, locinfo) {
    if (parser.yy.page.description.length == MAX_DESCRIPTION_LINES) {
      parser.yy.error(locinfo, 'TLDR108');
    } 
    parser.yy.page.description.push(description);
  };
  parser.yy.addExample = function(description, commands, locinfo) {
    if (parser.yy.page.examples.length == MAX_EXAMPLES) {
      parser.yy.error(locinfo, 'TLDR107');
    }
    parser.yy.page.examples.push({
      description: description,
      commands: commands
    });
  };
  // parser.yy.parseError = function(error, hash) {
  //   console.log(arguments); 
  // };
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
    };

    lexer.checkNewline = function(nl, locinfo) {
      if (nl.match(/\r/)) {
        parser.yy.error(locinfo, 'TLDR010')
      } 
    };
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
  var success, page, result;
  try {
    page = linter.parse(page);
    success = true;
  } catch(err) {
    console.error(err.toString());
    success = false;
  }
  if (verbose) {
    console.log(parser.yy.page.description.length + " line(s) of description");
    console.log(parser.yy.page.examples.length + " examples");
  }
  // TODO add error when filename doesn't match page title

  result = {
    page: parser.yy.page,
    errors: parser.yy.errors,
    success: success
  };

  if (alsoFormat)
    result.formatted = linter.format(parser.yy.page);

  return result;
};
