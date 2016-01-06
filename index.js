var tldrLint = require('./tldr-lint.js')
var fs = require('fs')
var path = require('path')

var cli = module.exports;
cli.process = function() {
  var args = process.argv.slice(2);
  args.forEach(function(file) {
    var stats = fs.statSync(file);
    if (stats.isDirectory()) {
      console.log('Currently only files supported')
      process.exit(1);
    }
    var page = fs.readFileSync(file, 'utf8');
    var errors = tldrLint(page);
    errors.forEach(function(error) {
      console.error(file + ':' + error.locinfo.first_line + ': ' + 
                    error.code + ' ' + error.description)
    });
  });
};

if (require.main === module) {
  cli.process();
  process.exit(0);
}
