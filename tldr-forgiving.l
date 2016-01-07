%{

%}

capital [A-Z]
alpha   [A-Za-z]
alphanum [A-Za-z0-9]
sentence [A-Za-z0-9].*[A-Za-z0-9\}]
/* word    {alphanum}+ */
punct   [\.,!:;]
space   [ ]

%%

{space}+   return 'WHITESPACE';
{sentence} return 'SENTENCE';
"#" return 'HASH';
">"   return 'GREATER';
"-"   return 'DASH';
/* "{"   return 'LBRACE'; */
/* "}"   return 'RBRACE'; */
"."   return 'PERIOD';
"`"   return 'BACKTICK';
\n+   return 'NEWLINE'; 
<<EOF>>   return 'EOF';
/* .*  return 'TEXT'; */


