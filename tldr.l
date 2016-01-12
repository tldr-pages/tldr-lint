%options backtrack_lexer
%lex


%{
  yy.initLexer(yy.lexer);
  /* num_descriptions = 0; */
  /* num_example_commands = 0; */ 
%}

%%

\s+<<EOF>>
%{
  console.error('trailing whitespace');
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

(\s*)\#(\s*)
%{
  this.pushState('title');
  if (this.matches[1]) {
    console.error('no whitespace before title');
  }
  if (yylloc.first_line !== 1) {
    console.error('title should be at start of file')
  }
  return 'HASH'; 
%}

([\>-])(\s*)
%{
  if (this.matches[1] == '>') {
    this.pushState('description');
    return 'GREATER_THAN';
  } else {
    this.pushState('example_description');
    return 'DASH';
  }
  if (!this.matches[2]) {
    console.error('Should be single space');
  } else if (this.matches[2].length > 1) {
    console.error('Just a single space man');
  } else if (this.matches[2] !== ' ') {
    console.error('Thats not even a space');
  }
%}

([a-z0-9-]+)(\.?)\n 
%{
  console.log("TITLE");
  if (this.topState() === "title") {
    var title = this.matches[1];
    yy.setTitle(title);
    if (this.matches[2] == '.') {
      console.error('nowp no period there');
    }
    this.popState();
    return 'TITLE';
  } else {
    this.reject();
  }
%}

([\w\+_\(\)\.,; -]+?)([\.,]?)\n
%{
  if (this.topState() === 'description') {
    console.log('DESCRIPTION LINE')
    this.popState();
    num_descriptions += 1
    return 'DESCRIPTION_LINE';
  } else {
    this.reject();
  }
%}


([\w\+_\(\) \.,\{\};-]+?)(\.?)\n
%{
  console.log('EXAMPLE DESCRIPTION')
  if (this.topState() === 'example_description') {
    console.log(this.matches);
    this.popState();
    num_example_commands = 0;
    return 'EXAMPLE_DESCRIPTION'
  } else {
    this.reject();
  }
%}

(.*?(?:\{\{(.*)\}\})*)*
%{
  if (this.topState() === 'example_command') {
    console.log(this.matches);
    return 'EXAMPLE_COMMAND';
  } else {
    this.reject();
  }
%}



`\n
%{
  if (this.topState() === 'example_command') {
    this.popState();
    return 'BACKTICK';
  } else {
    this.reject();
  }
%}

`
%{
  this.pushState('example_command');
  return 'BACKTICK';
%}

(\n)+
%{
  if (this.match.length > 1) {
    console.error('Only one newline')
  }  
  return 'NEWLINE';
%}
// TODO num_example_commands incrementen zo kan ik errors geven bij rare
// newlines enzo Laat toch de grammatica de rest van het groffe werk doen hier
// is al te veel gehack
