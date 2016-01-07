%{

%}

capital [A-Z]
alpha   [A-Za-z]

%%

\w+   return 'WHITESPACE';
\n+   /* IGNORE */
"#" return 'HASH';
">"   return 'GREATER';
"-"   return 'DASH';
"{"   return 'LBRACE';
"}"   return 'RBRACE';
"."   return 'PERIOD';
"`"   return 'BACKTICK';
<<EOF>>   return 'EOF';

.*  return 'TEXT';


