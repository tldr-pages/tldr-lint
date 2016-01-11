// Important note: default behavior is NOT exhaustive search like flex.
// Behavior can be changed using lexer.option.flex
// lex apparently behaves differently
%lex

%{
  yy.initLexer(yy.lexer);
%}

alpha   [A-Za-z]
newline \n

%%

// I think a lot can be simplified using lexer condition states.

\s+ %{
      if (yylloc.first_line === 1) {
        console.error('error, leading spaces');
      } else {
        console.log('whitespace', this.matches);
        this.unput(this.matches[0]);
      }

    %}

"# ?" %{
      console.log(yylloc);
      console.log(this.matches);
      if (yylloc.first_column === 0) {
        console.log('leading hash');
        var condition = {
          ctx: 'title',
          rules: this._currentRules()
        };
        this.pushState(condition.ctx, condition);
        return 'HASH';
      } else {  // Just ignore a hash that's not at start of a line
        this.less(1);
      }
    %}
" " return 'SPACE';
">"   return 'GREATER';
"-"   return 'DASH';
"{"   return 'LBRACE';
"}"   return 'RBRACE';
"."   return 'PERIOD';
"`"   return 'BACKTICK';
\n  return 'NEWLINE';
<<EOF>>   return 'EOF';

/* .*  return 'TEXT'; */

