%{

%}

capital [A-Z]
alpha   [A-Za-z]
alphanum [A-Za-z0-9]
somechar [^ \.`\n\-\#\>:]
// A sentence is an annoying thing. Just don't let it end in special characters
// that we use for syntax.
sentence [^ \.`\n\-\>\#].*[^: \.`\n]
/* word    {alphanum}+ */
punct   [\,!:;?]
special [\.\/\*]
space   [ ]

%%

{space}+   return 'WHITESPACE';
{sentence}|{somechar} return 'SENTENCE';
"#" return 'HASH';
">"   return 'GREATER';
"-"   return 'DASH';
/* "{"   return 'LBRACE'; */
/* "}"   return 'RBRACE'; */
"."   return 'PERIOD';
"`"   return 'BACKTICK';
":"   return 'COLON';
\n+   return 'NEWLINE'; 
<<EOF>>   return 'EOF';
/* .*  return 'TEXT'; */


