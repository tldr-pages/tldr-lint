%token HASH SPACE GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token CAPITAL TEXT
%token NEWLINE

%start page

%%

page    : title NEWLINE description examples EOF
        ;

title   : HASH SPACE TEXT NEWLINE
        ;

description : GREATER SPACE sentence NEWLINE
            ;

// Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences.
sentence    : CAPITAL TEXT %prec PERIOD
            ;

examples    : example examples
            | %empty
            ;

example     : NEWLINE example_description NEWLINE command NEWLINE
            ;

example_description : DASH SPACE sentence NEWLINE
                    ;

command     : BACKTICK TEXT %prec BACKTICK 
            ;
