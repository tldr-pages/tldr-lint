# tldr-lint

[![npm version][npm-image]][npm-url]
[![Build Status][github-actions-image]][github-actions-url]
[![Matrix chat][matrix-image]][matrix-url]

`tldr-lint` is a linting tool for validating [tldr](https://github.com/tldr-pages/tldr) pages.
It can also format your pages for you!

## Installation

`tldr-lint` and its alias `tldrl` can be installed via `npm`:

```sh
npm install --global tldr-lint
```

## Usage

It's really simple.

```txt
Usage: tldr-lint [options] <file|dir>

Options:
  -V, --version        output the version number
  -f, --format         also attempt formatting (to stdout, or as specified by -o)
  -o, --output <file>  output to formatted file
  -i, --in-place       formats in place
  -t, --tabular        format errors in a tabular format
  -v, --verbose        print verbose output
  -I, --ignore <codes> ignore comma separated tldr-lint error codes (e.g. "TLDR001,TLDR0014")
  -h, --help           display help for command
```

### Usage via Docker

We provide a Dockerfile for reproducibly building and testing `tldr-lint` even without having NodeJS installed.

For building the Docker image, run this command inside the cloned `tldr-lint` repository:

`docker build -t tldr-lint .`

For running a `tldr-lint` container, you need to mount a volume containing the page(s) you want to lint to the container.
For checking a single page, run (replacing `{{/path/to/page.md}}` with the path to the page you want to check):

`docker run --rm -v {{/path/to/page.md}}:/app/page.md tldr-lint page.md`

In order to run the container on a directory, mount this directory as follows:

`docker run --rm -v {{/path/to/directory}}:/app/pages tldr-lint pages/`

> [!NOTE]
> For Windows users, specify the full path to the directory or page you want to check along with the `docker run` command above.

## Linter errors

All of the errors can be found in [`lib/tldr-lint.js`](./lib/tldr-lint.js).

Error Code  | Description
:---------- | :-----------
TLDR001     | File should contain no leading whitespace
TLDR002     | A single space should precede a sentence
TLDR003     | Descriptions should start with a capital letter
TLDR004     | Command descriptions should end in a period
TLDR005     | Example descriptions should end in a colon with no trailing characters
TLDR006     | Command name and description should be separated by an empty line
TLDR007     | Example descriptions should be surrounded by empty lines
TLDR008     | File should contain no trailing whitespace
TLDR009     | Page should contain a newline at end of file
TLDR010     | Only Unix-style line endings allowed
TLDR011     | Page never contains more than a single empty line
TLDR012     | Page should contain no tabs
TLDR013     | Title should be alphanumeric with dashes, underscores or spaces
TLDR014     | Page should contain no trailing whitespace
TLDR015     | Example descriptions should start with a capital letter
TLDR016     | Label for information link should be spelled exactly `More information: `
TLDR017     | Information link should be surrounded with angle brackets
TLDR018     | Page should only include a single information link
TLDR019     | Page should only include a maximum of 8 examples
TLDR101     | Command description probably not properly annotated
TLDR102     | Example description probably not properly annotated
TLDR103     | Command example is missing its closing backtick
TLDR104     | Example descriptions should prefer infinitive tense (e.g. write) over present (e.g. writes) or gerund (e.g. writing)
TLDR105     | There should be only one command per example
TLDR106     | Page title should start with a hash (`#`)
TLDR107     | File name should end with `.md` extension
TLDR108     | File name should not contain whitespace
TLDR109     | File name should be lowercase
TLDR110     | Command example should not be empty

[npm-url]: https://www.npmjs.com/package/tldr-lint
[npm-image]: https://img.shields.io/npm/v/tldr-lint.svg

[github-actions-url]: https://github.com/tldr-pages/tldr-lint/actions
[github-actions-image]: https://img.shields.io/github/actions/workflow/status/tldr-pages/tldr-lint/test.yml?branch=main

[matrix-url]: https://matrix.to/#/#tldr-pages:matrix.org
[matrix-image]: https://img.shields.io/matrix/tldr-pages:matrix.org?label=chat+on+matrix
