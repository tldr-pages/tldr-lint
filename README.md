# tldr-lint

`tldr-lint` is a linting tool for validating [tldr](https://github.com/tldr-pages/tldr) pages.
It can also format your pages for you!

# Usage
It's really simple.

```
  Usage: tldr-lint [options] <file|dir>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --format         also attempt formatting (to stdout, or as specified by -o)
    -o, --output <file>  output formatted file
    -v, --verbose        print verbose output (for debugging)
```


# Linter Errors
There's a bunch of them. Couldn't bother writing them down just yet.
They're all in `lib/tldr-lint.js` though if you feel inclined.

## TODO
- Assert file has .md extension
- Assert file name is same as page title
