var linter = require('./tldr-lint.js')
var fs = require('fs')
var path = require('path')

var cli = module.exports;

cli.processFile = function(file, args) {
  try {
    var stats = fs.statSync(file);
  } catch(err) {
    console.error(err.toString());
    process.exit(1);
  }
  if (stats.isDirectory()) {
    console.error(`${file} is not a file`);
    process.exit(1);
  }
  var page = fs.readFileSync(file, 'utf8');
  var linterResult = linter.process(page, args.verbose, args.format);
  linterResult.errors.forEach(function(error) {
    console.error(file + ':' + (error.locinfo.first_line || 
                                error.locinfo.last_line - 1) +
                  ': ' + error.code + ' ' + error.description)
  });
  if (args.format) {
    if (!linterResult.success) 
      console.error('Refraining from formatting because of fatal error')
    else {
      var formattedPage = linterResult.formatted;
      if (args.output) {
        var err = fs.writeFileSync(args.output, formattedPage, 'utf8');
        if (err) throw err;
      } else {
        console.log(formattedPage); 
      }
    }
  }
  return linterResult;
};

cli.process = function(args) {
  if (args.args.length != 1) {
    args.help();
  }
  if (args.output && !args.format) {
    console.error('--output only makes sense when used with --format')
    process.exit(1);
  }
  var file = args.args[0];
  var result = cli.processFile(file, args);
  if (!result.success || result.errors.length >= 1) process.exit(1);
};

if (require.main === module) {
  var args = require('commander');
  args
    .version(require('../package.json').version)
    .arguments('<file>')
    .option('-f, --format', 'also attempt formatting (to stdout, or as specified by -o)')
    .option('-o, --output <file>', 'output formatted file')
    .option('-v, --verbose', 'print verbose output')
    .parse(process.argv);

  cli.process(args);
  process.exit(0);
}
