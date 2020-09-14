# tldr-lint

[![npm version][npm-image]][npm-url]
[![Build Status][github-actions-image]][github-actions-url]
[![David DM Dependency Status][dep-image]][dep-url]
[![Gitter chat][gitter-image]][gitter-url]

`tldr-lint` is a linting tool for validating [tldr](https://github.com/tldr-pages/tldr) pages.
It can also format your pages for you!


## Usage

It's really simple.

```
Usage: tldr-lint [options] <file|dir>

Options:
  -V, --version        output the version number
  -f, --format         also attempt formatting (to stdout, or as specified by -o)
  -o, --output <file>  output to formatted file
  -i, --in-place       formats in place
  -v, --verbose        print verbose output
  -h, --help           output usage information
```


## Linter errors

There's a bunch of them. Couldn't bother writing them down just yet.
They're all in `lib/tldr-lint.js` though if you feel inclined.

## To-do

- Assert file has .md extension
- Assert file name is same as page title

[npm-url]: https://www.npmjs.com/package/tldr-lint
[npm-image]: https://img.shields.io/npm/v/tldr-lint.svg

[github-actions-url]: https://github.com/tldr-pages/tldr-lint/actions
[github-actions-image]: https://img.shields.io/github/workflow/status/tldr-pages/tldr-lint/Tests/master.svg

[dep-url]: https://david-dm.org/tldr-pages/tldr-lint
[dep-image]: https://david-dm.org/tldr-pages/tldr-lint.svg?theme=shields.io

[dev-dep-url]: https://david-dm.org/tldr-pages/tldr-lint#info=devDependencies
[dev-dep-image]: https://david-dm.org/tldr-pages/tldr-lint/dev-status.svg?theme=shields.io

[gitter-url]: https://gitter.im/tldr-pages/tldr
[gitter-image]: https://badges.gitter.im/tldr-pages/tldr.png
