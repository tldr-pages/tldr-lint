%token HASH SPACE GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token CAPITAL TEXT
%token NEWLINE

%start page

%%

page    : title NEWLINE descriptions examples EOF
        ;

title   : HASH TEXT NEWLINE -> yy.error(@$, 'Missing space before title.') 
        | HASH SPACE TEXT NEWLINE 
        ;


descriptions : description descriptions 
             | %empty
             ;
             
description : GREATER SPACE sentence NEWLINE -> yy.addDescription($sentence)
            ;

// Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences.
sentence    : CAPITAL TEXT %prec PERIOD
            ;

examples    : example examples
            | %empty
            ;

example     : NEWLINE example_description NEWLINE command NEWLINE 
              -> yy.addExample($example_description, $command)
            ;

example_description : DASH SPACE sentence NEWLINE
                    ;

command     : BACKTICK TEXT %prec BACKTICK -> $TEXT
            ;
