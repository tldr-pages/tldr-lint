var tldrLint = require('./tldr-lint.js')
var fs = require('fs')
var path = require('path')

var cli = module.exports;
cli.processInputFile
cli.process = function() {
  var args = process.argv.slice(2);
  console.log(args);
  args.forEach(function(file) {
    var stats = fs.statSync(file);
    if (stats.isDirectory()) {
      console.log('Currently only files supported')
      process.exit(1);
    }
    var page = fs.readFileSync(file, 'utf8');
    console.log(page);
    var results = tldrLint(page);
    if (results.error) {
      process.exit(1);
    }
  });
};

if (require.main === module) {
  cli.process();
  process.exit(0);
}
