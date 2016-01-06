%token HASH SPACE GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token CAPITAL TEXT
%token NEWLINE

%start page

%%

page    : title NEWLINE description examples
        ;

sentence    : CAPITAL TEXT PERIOD
            ;

title   : HASH SPACE TEXT NEWLINE
        ;

description : GREATER SPACE sentence NEWLINE NEWLINE
            ;

examples    : example examples
            | %empty
            ;

example     : NEWLINE example_description NEWLINE command
            ;

example_description : DASH SPACE sentence NEWLINE
                    ;

command     : BACKTICK TEXT BACKTICK NEWLINE
            ;
