%options backtrack_lexer
%lex

%{
  yy.initLexer(yy.lexer);
%}

eol (?:\r\n)|\n|\r
space [ \t]

%%

\s+<<EOF>>
%{
  yy.error(yylloc, 'TLDR008');
%}

.*?\t+.*
%{
  yy.error(yylloc, 'TLDR012');
  var cleaned = this.match.replace(/\t/g, ' ');
  this.unput(cleaned);
%}

[^\n]<<EOF>>
%{
  // this.setInput resets the state as well, so push that back in
  var currentConditionStack = this.conditionStack;
  var currentConditions = this.conditions;
  // Basically replace EOF with a final newline so lexing can continue
  this.setInput(this.match + '\n')
  this.conditionStack = currentConditionStack;
  this.currentConditions = currentConditions;
  yy.error(yylloc, 'TLDR009');
%}

(\s*)\#(\s*)
%{
  if (this.topState() !== 'INITIAL') {
    this.reject();
    return;
  }
  this.pushState('title');
  if (this.matches[1]) {
    yy.error(yylloc, 'TLDR001');
  }
  if (this.matches[2] !== ' ') {
    yy.error(yylloc, 'TLDR002');
  }
  return 'HASH';
%}

([\>-])(\s*)
%{
  if (this.topState() !== 'INITIAL') {
    this.reject();
    return;
  }
  if (this.matches[2] !== ' ') {
    yy.error(yylloc, 'TLDR002');
  }
  if (this.matches[1] == '>') {
    this.pushState('description');
    return 'GREATER_THAN';
  } else {
    this.pushState('example_description');
    return 'DASH';
  }
%}

([Mm]ore\s+[Ii]nfo(?:rmation)?\:?\s*)
%{
  if (this.topState() !== 'description') {
    this.reject();
    return;
  }
  if (this.matches[1] !== 'More information: ') {
    yy.error(yylloc, 'TLDR016');
  }
  this.popState();
  this.pushState('information_link');
  return 'INFORMATION_LINK';
%}

(\<https?\:\/\/[^\s\>]*\>)
%{
  if (this.topState() !== 'information_link') {
    this.reject();
    return;
  }
  this.popState();
  this.pushState('information_link_url');
  return 'ANGLE_BRACKETED_URL';
%}

// All regexes below are actually about the same, but it's better organized
// this way around.
(.+?)([ ]*){eol}
%{
  if (this.topState() === "title") {
    yytext = this.matches[1];
    if (
      /[^\w+\[\]{}!%,^~$. \-]/.test(yytext) || 
      (yytext.endsWith('.') && yytext !== '.' && yytext !== ' .')
    ) {
      yy.error(yylloc, 'TLDR013');
    }
    this.checkTrailingWhitespace(this.matches[2], yylloc);
    this.checkNewline(this.matches[3], yylloc);
    this.popState();
    return 'TITLE';
  } else if (this.topState() === 'information_link_url') {
    if (this.matches[1] != '.') yy.error(yylloc, 'TLDR004');
    this.checkTrailingWhitespace(this.matches[2], yylloc);
    this.checkNewline(this.matches[3], yylloc);
    this.popState();
    return 'END_INFORMATION_LINK_URL';
  } else if (this.topState() === 'information_link') {
    this.checkTrailingWhitespace(this.matches[2], yylloc);
    this.checkNewline(this.matches[3], yylloc);
    this.popState();
    return 'END_INFORMATION_LINK';
  } else {
    this.reject();
  }
%}

(.+?)([\.,;!\?]?)([ ]*){eol}
%{
  if (this.topState() === 'description') {
    this.popState();
    yytext = this.matches[1];
    var exceptions = ['npm', 'pnpm'];
    if (!exceptions.includes(yytext.replace(/ .*/,'')) && yytext.match(/^[a-z]/)) {
      yy.error(yylloc, 'TLDR003');
    }
    if (yytext.match(/(note|NOTE): /)) {
      yy.error(yylloc, 'TLDR020');
    }
    var punctuation = this.matches[2];
    if (punctuation !== '.') {
      yy.error(yylloc, 'TLDR004');
    }
    if (punctuation.match(/[,;]/)) {
      console.warn(`Description ends in \'${punctuation}\'. Consider writing your sentence on one line.`);
    }
    this.checkTrailingWhitespace(this.matches[3], yylloc);
    this.checkNewline(this.matches[4], yylloc);
    return 'DESCRIPTION_LINE';
  } else {
    this.reject();
  }
%}


(.+?)([\.:,;]?)([ ]*){eol}
%{
  if (this.topState() === 'example_description') {
    this.popState();
    yytext = this.matches[1];
    if (!yytext.match(/^[\p{Lu}\[]/u)) yy.error(yylloc, 'TLDR015');
    if (this.matches[2] !== ':') yy.error(yylloc, 'TLDR005');
    if (yytext.match(/(note|NOTE): /)) {
      yy.error(yylloc, 'TLDR020');
    }
    // Try to ensure that verbs at the beginning of the description are in the infinitive tense
    // 1. Any word at the start of a sentence that ends with "ing" and is 6 or more characters long (e.g. executing, writing) is likely a verb in the gerund
    // 2. Any word at the start of a sentence that doesn't end with "us", "ss", or "ys" (e.g. superfluous, success, always) is likely a verb in the present tense
    if (yytext.match(/(^[A-Za-z]{3,}ing )|(^[A-Za-z]+[^usy]s )/)) {
      yy.error(yylloc, 'TLDR104');
    }
    // Check if any sneaky spaces have been caught
    this.checkTrailingWhitespace(this.matches[3], yylloc);
    this.checkNewline(this.matches[3], yylloc);
    return 'EXAMPLE_DESCRIPTION';
  } else {
    this.reject();
  }
%}

\`{eol}
%{
  if (this.topState() === 'example_command') {
    this.popState();
    this.checkNewline(this.matches[1], yylloc);
    return 'BACKTICK';
  } else {
    this.reject();
  }
%}

\`([ ]*)
%{
  this.pushState('example_command');
  if (this.matches[1].match(/ /)) {
    yy.error(yylloc, 'TLDR021')
  }
  return 'BACKTICK';
%}

\{\{([^\n\`\{\}]*)\}\}({eol}?)
%{
  if (this.topState() === 'example_command') {
    yytext = this.matches[1];
    if (this.matches[3]) {
      // Matched a newline where there certainly should not be one
      // This code is duplicated from two rules below.. should unify
      this.unput('`' + this.matches[2]);
      yy.error(yylloc, 'TLDR103')
    }
    return 'COMMAND_TOKEN';
  } else this.reject();
%}

// Example commands text either runs up to two left braces (signaling a token)
// Or up to a backtick, which means that's it for the command.
([^\`\n]+?)\{\{
%{
  if (this.topState() === 'example_command') {
    this.unput('{{');
    yytext = this.matches[1];
    return 'COMMAND_TEXT';
  } else this.reject();
%}

([^\`\n]+?)(\`[ ]*|[ ]*{eol})
%{
  if (this.topState() === 'example_command') {
    // Check if there are some trailing spaces
    if (this.matches[2].match(/ /)) {
      yy.error(yylloc, 'TLDR014');
    }
    if (this.matches[1].endsWith(' ') && !this.matches[1].endsWith('\\ ')) {
      yy.error(yylloc, 'TLDR021');
    }
    // Don't swallow the trailing backtick just yet
    if (this.matches[2].match(/\`/)) this.unput('`');
    else {
      // If command doesn't end in a backtick, just add a backtick anyway
      // Also pop back the newline. Let's pretend we don't care what that is.
      this.unput('`\n');
      yy.error(yylloc, 'TLDR103')
    }
    yytext = this.matches[1];
    return 'COMMAND_TEXT';
  } else this.reject();
%}

[ ]+
%{
  yy.error(yylloc, 'TLDR014');
%}

{eol}+
%{
  // Either you've got more than a single \n or \r or more than \r\n
  var isdos = this.match.match(/\r\n/);
  if (isdos && this.match.length > 2 || !isdos && this.match.length > 1) {
    yy.error(yylloc, 'TLDR011');
  }
  this.checkNewline(this.match, yylloc);
  return 'NEWLINE';
%}

// This is a catchall that just slurps up a line if doesn't match
// The compiler can then use it to create meaningful errors since it has
// more context than the lexer does
(.+?)[\.:]?{eol}
%{
  yytext = this.matches[1];
  return 'TEXT';
%}
