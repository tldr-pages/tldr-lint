%token HASH GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token TEXT WHITESPACE

%start page

%%

page    : title descriptions examples
        ;

title   : HASH WHITESPACE sentence
        ;

descriptions : description descriptions
             | %empty
             ;
             
description : GREATER whitespace sentence -> yy.addDescription($sentence)
            ;

// Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences.
sentence    : TEXT %prec eos
            ;

eos     : PERIOD
        ;

examples    : example examples
            | %empty
            ;

example     : example_description newlines command
              -> yy.addExample($example_description, $command)
            ;

example_description : DASH whitespace sentence
                    ;

command     : BACKTICK TEXT %prec BACKTICK -> $TEXT
            ;
