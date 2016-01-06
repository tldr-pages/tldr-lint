var tiny-lint = require('tiny-lint')
var fs = require('fs')
var path = require('path')

tiny-lint(process.argv.slice(2))

var cli = module.exports;
cli.processInputFile
cli.process = function() {
  var args = process.argv.slice(2);
  args.forEach(function(file) {
    var stats = fs.statSync(file);
    if (stats.isDirectory()) {
      console.log('Currently only files supported')
      process.exit(1);
    }
    var page = fs.readFileSync(page, 'utf8');
    var results = tiny-lint(page);
    if (results.error) {
      process.exit(1);
    }
  });
};

if (require.main === module) {
  cli.process();
  process.exit(0);
}
