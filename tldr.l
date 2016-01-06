%{

%}

capital [A-Z]
alpha   [A-Za-z]
newline \n

%%

"#" return 'HASH';
" " return 'SPACE';
">"   return 'GREATER';
"-"   return 'DASH';
"{"   return 'LBRACE';
"}"   return 'RBRACE';
{newline}  return 'NEWLINE';
"."   return 'PERIOD';
"`"   return 'BACKTICK';
{capital}   return 'CAPITAL';
<<EOF>>   return 'EOF';

.*  return 'TEXT';

