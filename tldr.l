%{

%}

alpha   [A-Za-z]
newline \n

%%

"#" return 'HASH';
" " return 'SPACE';
">"   return 'GREATER';
"-"   return 'DASH';
"{"   return 'LBRACE';
"}"   return 'RBRACE';
"."   return 'PERIOD';
"`"   return 'BACKTICK';
{newline}  return 'NEWLINE';
<<EOF>>   return 'EOF';

.*  return 'TEXT';

