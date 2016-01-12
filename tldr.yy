%token HASH SPACE GREATER_THAN DASH PERIOD
%token LBRACE RBRACE
%token BACKTICK
%token CAPITAL TEXT
%token NEWLINE

%start page

%%

page      : title NEWLINE description examples
          ;

title     : HASH TITLE
          ;

description   : GREATER_THAN DESCRIPTION_LINE
              | description GREATER_THAN DESCRIPTION_LINE
              ;

examples  : %empty
          | examples example
          ;

example   : NEWLINE example_description NEWLINE example_commands
          ;

example_description : DASH EXAMPLE_DESCRIPTION
                    ;

example_commands    : example_command
                    | example_commands example_command
                    ;

example_command     : BACKTICK EXAMPLE_COMMAND BACKTICK
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
