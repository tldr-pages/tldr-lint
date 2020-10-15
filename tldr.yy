%token HASH GREATER_THAN DASH BACKTICK
%token NEWLINE
%token DESCRIPTION_LINE
%token EXAMPLE_DESCRIPTION
%token COMMAND_TOKEN COMMAND_TEXT
%token TEXT

%start page

%%

page      : title NEWLINE info examples
          | title info examples          -> yy.error(@$, 'TLDR006')
          | title NEWLINE TEXT examples         -> yy.error(@$, 'TLDR101') || yy.addDescription($TEXT);
          ;

title     : HASH TITLE  -> yy.setTitle($TITLE) 
          | TEXT        -> yy.error(@TEXT, 'TLDR106') || yy.setTitle($TEXT)
          ;

info  : description
      | description more_information
      ;

description   : GREATER_THAN DESCRIPTION_LINE -> yy.addDescription($DESCRIPTION_LINE)
              | description GREATER_THAN DESCRIPTION_LINE -> yy.addDescription($DESCRIPTION_LINE)
              ;

more_information  : GREATER_THAN MORE_INFORMATION ANGLE_BRACKETED_URL END_MORE_INFORMATION_URL
                    -> yy.addMoreInformation($ANGLE_BRACKETED_URL)
                  | GREATER_THAN MORE_INFORMATION END_MORE_INFORMATION
                    -> yy.error(@$, 'TLDR017') || yy.addDescription($MORE_INFORMATION + $END_MORE_INFORMATION.trim())
                  ;

examples  : %empty
          | examples example
          ;

example   : maybe_newline example_description maybe_newline example_commands
            { 
              yy.addExample($example_description, $example_commands);
              // Just use the description line's location, easy to find
              if (!$maybe_newline1) 
                yy.error(@example_description, 'TLDR007');
              if (!$maybe_newline2) 
                yy.error(@example_commands, 'TLDR007');
            }
          ;

maybe_newline   : %empty 
                | NEWLINE
                ;

example_description : DASH EXAMPLE_DESCRIPTION  -> $EXAMPLE_DESCRIPTION
                    | TEXT -> yy.error(@$, 'TLDR102') || $TEXT
                    ;

example_commands    : example_command   -> [$example_command]
                    | example_commands example_command
                      -> yy.error(@example_command, 'TLDR105') || $example_commands
                    ;

example_command     : BACKTICK example_command_inner BACKTICK -> $example_command_inner
                    /* | BACKTICK example_command_inner          -> yy.error(@$, 'TLDR103') || $example_command_inner */
                    ;

example_command_inner : -> []
                      | example_command_inner COMMAND_TEXT
                        -> [].concat($example_command_inner, yy.createCommandText($COMMAND_TEXT))
                      | example_command_inner COMMAND_TOKEN
                        -> [].concat($example_command_inner, yy.createToken($COMMAND_TOKEN))
                      ;
