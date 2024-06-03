#!/usr/bin/env node

const linter = require('./tldr-lint.js');
const fs = require('fs');
const path = require('path');
const cli = module.exports;
const util = require('util');

cli.writeErrors = function(file, linterResult, args) {
  const format = args.tabular ? '%s\t%s\t%s\t%s\t' : '%s:%s: %s %s';
  linterResult.errors.forEach(function(error) {
    console.error(util.format(format, file, (error.locinfo.first_line ||
                                            error.locinfo.last_line - 1),
    error.code, error.description));
  });
  if (args.format) {
    if (!linterResult.success) {
      console.error('Refraining from formatting because of fatal error');
    } else {
      const formattedPage = linterResult.formatted;
      let err;
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
  const linterResult = linter.processFile(file, args.verbose, args.format, args.ignore);
  cli.writeErrors(file, linterResult, args);
  return linterResult;
};

cli.processDirectory = function(dir, args) {
  const files = fs.readdirSync(dir);
  let stats;
  const result = {
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
      const linterResult = cli.processFile(file, args);
      result.success &= linterResult.success;
      result.errors = result.errors.concat(linterResult.errors);
    } else {
      const aggregateResult = cli.processDirectory(file, args);
      result.success &= aggregateResult.success;
      result.errors = result.errors.concat(aggregateResult.errors);
    }
  });
  return result;
};

cli.process = function(file, args) {
  if (args.output && !args.format) {
    console.error('--output only makes sense when used with --format');
    process.exit(1);
  }
  let stats;
  try {
    stats = fs.statSync(file);
  } catch(err) {
    console.error(err.toString());
    process.exit(1);
  }
  const isdir = stats.isDirectory();
  if (args.output && isdir) {
    console.error('--output only makes sense when used with a file');
  }
  const result = isdir ? cli.processDirectory(file, args) : cli.processFile(file, args);
  if (!result.success || result.errors.length >= 1) return process.exit(1);
};

if (require.main === module) {
  const { program } = require('commander');
  const pkg = require('../package.json');
  program
    .version(pkg.version)
    .description(pkg.description)
    .arguments('<file|dir>')
    .option('-f, --format', 'also attempt formatting (to stdout, or as specified by -o)')
    .option('-o, --output <file>', 'output to formatted file')
    .option('-i, --in-place', 'formats in place')
    .option('-t, --tabular', 'format errors in a tabular format')
    .option('-v, --verbose', 'print verbose output')
    .option('-I, --ignore <codes>', 'ignore comma separated tldr-lint error codes (e.g. "TLDR001,TLDR0014")')
    .parse(process.argv);

  if (program.args.length !== 1) {
    program.help({ error: true });
  }
  cli.process(program.args[0], program.opts());
  process.exit(0);
}
