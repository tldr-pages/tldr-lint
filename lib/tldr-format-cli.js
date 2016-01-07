var tldrFormat = require('./tldr-format.js');
var fs = require('fs')
var path = require('path')

var cli = module.exports;

cli.processFile = function(file, args) {
  var stats = fs.statSync(file);
  if (stats.isDirectory()) {
    console.error(`${file} is not a file`);
    process.exit(1);
  }
  var page = fs.readFileSync(file, 'utf8');
  var formattedPage = tldrFormat.format(page);
  if (args.output) {
    fs.writeFile(args.output, formattedPage, 'utf8', function(err) {
      if (err) throw err;
    });
  } else {
    console.log(formattedPage); 
  }
};

cli.process = function(args) {
    // console.log(args);
    if (args.args.length != 1) {
      args.help();
    }
    var file = args.args[0];
    return cli.processFile(file, args);
};

if (require.main === module) {
  var args = require('commander');
  args
    .version('0.1')
    .arguments('<file>')
    .option('-o, --output <file>', 'output file')
    .parse(process.argv);

  cli.process(args);
  process.exit(0);
}

