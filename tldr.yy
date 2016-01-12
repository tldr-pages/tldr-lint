%token HASH GREATER_THAN DASH BACKTICK
%token NEWLINE
%token DESCRIPTION_LINE
%token EXAMPLE_DESCRIPTION
%token COMMAND_TOKEN COMMAND_TEXT

%start page

%%

page      : title NEWLINE description examples
          ;

title     : HASH TITLE  -> yy.setTitle($TITLE) 
          ;

description   : GREATER_THAN DESCRIPTION_LINE -> yy.addDescription($DESCRIPTION_LINE)
              | description GREATER_THAN DESCRIPTION_LINE
              ;

examples  : %empty
          | examples example
          ;

example   : NEWLINE example_description NEWLINE example_commands
            -> yy.addExample($example_description, $example_commands)
          ;

example_description : DASH EXAMPLE_DESCRIPTION  -> $EXAMPLE_DESCRIPTION
                    ;

example_commands    : example_command   -> [$example_command]
                    | example_commands example_command
                      -> [].concat($example_commands, [$example_command])
                    ;

example_command     : BACKTICK example_command_inner BACKTICK -> $example_command_inner
                    ;

example_command_inner : -> []
                      | example_command_inner COMMAND_TEXT
                        -> [].concat($example_command_inner, yy.createCommandText($COMMAND_TEXT))
                      | example_command_inner COMMAND_TOKEN
                        -> [].concat($example_command_inner, yy.createToken($COMMAND_TOKEN))
                      ;

/* page    : title NEWLINE descriptions examples EOF */
/*         ; */

/* title   : HASH TEXT NEWLINE -> yy.error(@$, 'TLDR001') */ 
/*         | HASH SPACE TEXT NEWLINE */ 
/*         ; */


/* descriptions : description descriptions */ 
/*              | %empty */
/*              ; */
             
/* description : GREATER_THAN SPACE sentence NEWLINE -> yy.addDescription($sentence) */
/*             ; */

/* // Added in %prec to make sure TEXT doesn't eat PERIOD. Only works for simple sentences. */
/* sentence    : CAPITAL TEXT %prec PERIOD */
/*             ; */

/* examples    : example examples */
/*             | %empty */
/*             ; */

/* example     : NEWLINE example_description NEWLINE command NEWLINE */ 
/*               -> yy.addExample($example_description, $command) */
/*             ; */

/* example_description : DASH SPACE sentence NEWLINE */
/*                     ; */

/* command     : BACKTICK TEXT %prec BACKTICK -> $TEXT */
/*             ; */
