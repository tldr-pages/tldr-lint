#!/usr/bin/env node

var linter = require('./tldr-lint.js');
var fs = require('fs');
var path = require('path');
var cli = module.exports;
var util = require('util');

cli.writeErrors = function(file, linterResult, args) {
  var format;
  if (args.tabular) {
    format = '%s\t%s\t%s\t%s\t';
  } else {
    format = '%s:%s: %s %s';
  }
  linterResult.errors.forEach(function(error) {
    console.error(util.format(format, file, (error.locinfo.first_line ||
                                            error.locinfo.last_line - 1),
    error.code, error.description));
  });
  if (args.format) {
    if (!linterResult.success) {
      console.error('Refraining from formatting because of fatal error');
    } else {
      var formattedPage = linterResult.formatted;
      var err;
      if (args.output) {
        err = fs.writeFileSync(args.output, formattedPage, 'utf8');
        if (err) throw err;
      } else if (args.inPlace) {
        err = fs.writeFileSync(file, formattedPage, 'utf8');
        if (err) throw err;
      } else {
        console.log(formattedPage);
      }
    }
  }
};

cli.processFile = function(file, args) {
  var linterResult = linter.processFile(file, args.verbose, args.format);
  cli.writeErrors(file, linterResult, args);
  return linterResult;
};

cli.processDirectory = function(dir, args) {
  var files = fs.readdirSync(dir);
  var stats;
  var result = {
    success: true,
    errors: []
  };
  files.forEach(function(file) {
    file = path.join(dir, file);
    try {
      stats = fs.statSync(file);
    } catch(err) {
      console.error(err.toString());
      process.exit(1);
    }
    if (stats.isFile()) {
      // Only treat files ending in .md
      if (!file.match(/\.md$/)) return;
      var linterResult = cli.processFile(file, args);
      result.success &= linterResult.success;
      result.errors = result.errors.concat(linterResult.errors);
    } else {
      var aggregateResult = cli.processDirectory(file, args);
      result.success &= aggregateResult.success;
      result.errors = result.errors.concat(aggregateResult.errors);
    }
  });
  return result;
};

cli.process = function(args) {
  if (args.args.length != 1) {
    args.help();
  }
  if (args.output && !args.format) {
    console.error('--output only makes sense when used with --format');
    process.exit(1);
  }
  var file = args.args[0];
  try {
    var stats = fs.statSync(file);
  } catch(err) {
    console.error(err.toString());
    process.exit(1);
  }
  var isdir = stats.isDirectory();
  if (args.output && isdir) {
    console.error('--output only makes sense when used with a file');
  }
  var result;
  if (!isdir) {
    result = cli.processFile(file, args);
  } else {
    result = cli.processDirectory(file, args);
  }
  if (!result.success || result.errors.length >= 1) return process.exit(1);
};

if (require.main === module) {
  var args = require('commander');
  var package = require('../package.json');
  args
    .version(package.version)
    .description(package.description)
    .arguments('<file|dir>')
    .option('-f, --format', 'also attempt formatting (to stdout, or as specified by -o)')
    .option('-o, --output <file>', 'output to formatted file')
    .option('-i, --in-place', 'formats in place')
    .option('-t, --tabular', 'format errors in a tabular format')
    .option('-v, --verbose', 'print verbose output')
    .parse(process.argv);

  cli.process(args);
  process.exit(0);
}
