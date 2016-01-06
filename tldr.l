%{

%}

capital [A-Z]
alpha   [A-Za-z]
text    .*

%%

"#" return 'HASH';
" " return 'SPACE';
">"   return 'GREATER';
"-"   return 'DASH';
"{"   return 'LBRACE';
"}"   return 'RBRACE';
"\n"  return 'NEWLINE';
"."   return 'PERIOD';
"`"   return 'BACKTICK';
{capital}   return 'CAPITAL';
{text}  return 'TEXT';

<<EOF>>   return 'EOF';

