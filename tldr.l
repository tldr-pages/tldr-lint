%options backtrack_lexer
%lex

%{
  yy.initLexer(yy.lexer);
%}

%%

\s+<<EOF>>
%{
  yy.error(yylloc, 'TLDR008');
%}

\t+
%{
  console.error('No tabs allowed');
%}

\r\n?
%{
  console.error('Only Unix-style line endings allowed');
  return 'NEWLINE';
%}

[^\n]<<EOF>>
%{
  this.less(1);
  yy.error(yylloc, 'TLDR009');
%}

(\s*)\#(\s*)
%{
  this.pushState('title');
  if (this.matches[1]) {
    yy.error(yylloc, 'TLDR001');
  }
  if (this.matches[2] !== ' ') {
    yy.error(yylloc, 'TLDR002')
  } 
  return 'HASH'; 
%}

([\>-])(\s*)
%{
  if (this.matches[2] !== ' ') {
    yy.error(yylloc, 'TLDR002')
  } 
  if (this.matches[1] == '>') {
    this.pushState('description');
    return 'GREATER_THAN';
  } else {
    this.pushState('example_description');
    return 'DASH';
  }
%}

([a-z0-9-]+)(\.?)\n 
%{
  if (this.topState() === "title") {
    yytext = this.matches[1];
    if (this.matches[2] == '.') {
      console.error('nowp no period there');
    }
    this.popState();
    return 'TITLE';
  } else {
    this.reject();
  }
%}

([\w\+_\(\)\.,; -]+?)(.?)\n
%{
  if (this.topState() === 'description') {
    this.popState();
    yytext = this.matches[1];
    if (!yytext.match(/^[A-Z]/)) yy.error(yylloc, 'TLDR003');
    if (this.matches[2] !== '.') yy.error(yylloc, 'TLDR004');
    return 'DESCRIPTION_LINE';
  } else {
    this.reject();
  }
%}


([\w\+_\(\) \.,\{\};-]+?)(.?)\n
%{
  if (this.topState() === 'example_description') {
    this.popState();
    yytext = this.matches[1];
    if (!yytext.match(/^[A-Z]/)) yy.error(yylloc, 'TLDR003');
    if (this.matches[2] !== ':') yy.error(yylloc, 'TLDR005');
    return 'EXAMPLE_DESCRIPTION'
  } else {
    this.reject();
  }
%}

\`\n
%{
  if (this.topState() === 'example_command') {
    this.popState();
    return 'BACKTICK';
  } else {
    this.reject();
  }
%}

\`
%{
  this.pushState('example_command');
  return 'BACKTICK';
%}

\{\{([^\n\`\{\}]*)\}\}
%{
  if (this.topState() === 'example_command') {
    yytext = this.matches[1];
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

([^\`\n]+?)\`
%{
  if (this.topState() === 'example_command') {
    this.unput('`');
    yytext = this.matches[1];
    return 'COMMAND_TEXT';
  } else this.reject();
%}

(\n)+
%{
  if (this.match.length > 1) {
    console.error('Only one newline')
  }  
  return 'NEWLINE';
%}
