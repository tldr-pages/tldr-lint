# tldr-lint

`tldr-lint` and his brother `tldr-format` are tools for validating [tldr](https://github.com/tldr-pages/tldr) pages. 

## tldr-format

So what's `tldr-format` for? It's for automatically formatting almost-adhering pages.

# The Plan

The Plan with capital `P` is to have Travis automatically check all incoming pages using the linter `tldr-lint`, in the [tldr](https://github.com/tldr-pages/tldr) repository.

# TODO
## Deployment
- Make it decent enough 
- Make sure all of tldr adheres to the current spec
- Let Travis know about it
- ???
- PROFIT

## Functionality
- Kind of merge `tldr-lint` and `tldr-format`. Give `tldr-lint` the option to format as best as it can while also linting.
  Just an idea, but it sounds useful enough. 

## Linter Errors

### Done
```
TLDR001 Space before page title. Actually this is also validated by markdown linters.
```

### TODO
- Assert file has .md extension
- Assert file name is same as page title
- Lint newlines
- Assert whitespace after `#`, `>`, `-`
- Capitalization
- Punctuation
