%token WORD
%token SPECIAL
%token SENTENCE
%token HASH GREATER DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token TEXT WHITESPACE
%token NEWLINE

%start page

%%

page    : title descriptions examples EOF
        // Whoever starts files with newlines
        | NEWLINE title descriptions examples EOF
        ;

title   : HASH sentence             -> yy.setTitle($sentence)
        | HASH WHITESPACE sentence  -> yy.setTitle($sentence)
        ;

descriptions : description descriptions
             | %empty
             ;
             
description : GREATER WHITESPACE sentence -> yy.addDescription($sentence)
            | GREATER sentence            -> yy.addDescription($sentence)
            | WHITESPACE sentence         -> yy.addDescription($sentence)
            | sentence                    -> yy.addDescription($sentence)
            ;

// Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences.
sentence    : SENTENCE eos  -> $SENTENCE
            | SENTENCE BACKTICK eos -> $SENTENCE + $BACKTICK
            ;

whitespace  : WHITESPACE
            | % empty
            ;

eos     : NEWLINE
        | PERIOD NEWLINE
        ;

examples    : example examples
            | %empty
            ;

example     : example_description commands
              -> yy.addExample($example_description, $commands)
            ;

example_description : DASH WHITESPACE sentence  -> $sentence
                    | DASH sentence             -> $sentence
                    ;

commands    : command commands  -> [].concat([$command], $commands)
            | command           -> [$command]
            ;

command     : BACKTICK command_inner BACKTICK NEWLINE -> $command_inner
            ;

command_inner   : SENTENCE
                | SENTENCE special            -> $SENTENCE + $special
                | SENTENCE WHITESPACE special -> $SENTENCE + $WHITESPACE + $special
                ;

special : PERIOD          -> $PERIOD
        | PERIOD special  -> $PERIOD + $special
        | DASH            -> $DASH
        | DASH special    -> $DASH + $special
        ;


/* command_inner : SENTENCE command_inner */
/*               | command_token command_inner */
/*               | %empty */
/*               ; */

/* command_token : LBRAC LBRAC SENTENCE RBRAC RBRAC */
/*               ; */
