%token WORD
%token SENTENCE
%token HASH GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token TEXT WHITESPACE
%token NEWLINE

%start page

%%

page    : title descriptions examples EOF
        ;

title   : HASH sentence             -> yy.setTitle($sentence)
        | HASH WHITESPACE sentence  -> yy.setTitle($sentence)
        ;

descriptions : description descriptions
             | %empty
             ;
             
description : GREATER WHITESPACE sentence -> yy.addDescription($sentence)
            ;

// Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences.
sentence    : SENTENCE eos  -> $SENTENCE
            ;

eos     : NEWLINE
        | PERIOD NEWLINE
        ;

examples    : example examples
            | %empty
            ;

example     : example_description command
              -> yy.addExample($example_description, $command)
            ;

example_description : DASH WHITESPACE sentence -> $sentence
                    ;

command     : BACKTICK command_inner BACKTICK NEWLINE -> $command_inner
            ;

command_inner   : SENTENCE
                ;

/* command_inner : SENTENCE command_inner */
/*               | command_token command_inner */
/*               | %empty */
/*               ; */

/* command_token : LBRAC LBRAC SENTENCE RBRAC RBRAC */
/*               ; */
