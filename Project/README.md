# JJWN
Todo List (ADD AS WE GO)
1. Create Game
 
    a. Quiz Question system
 
        - Question at the top of screen, 4 buttons for answers
 
        - 1 correct, 3 wrong answers
 
            - pulled from other questions/designated ???
            - JV - (Think it would be good to have option for each. Vocab-related games would be easy to set up with answers pulled from other questions (and would be less intensive than having to write in wrong answers for each question, but other types of questions would likely have answers that are obviously unrelated to other questions.)

        - Distinct hovering display (color, size, etc)
 
        - Points awarded for quickness
 
        - Questions synchronous or asynchronous ???
        - JV - I think asynchronous would add more action to the game and further reward quickness
 
    b. Ranking componentThere are merge conflicts. Resolve them before committing.
 
        - Rankings (after _#_ questions/minutes ???)
        - JV - Possibly want to code in a way to detect how many questions there are. This way we can alter how often the rankings are re-made and we don't run out of questions. 
 
        - Matchups based on rankings for next _#_ questions
        - JV - Same as above
 
        - Winner at end of each battle has most points
 
        - Winner becomes "team captain," points now added up, "loser" becomes a player for the winning team (does some things for fewer points)
 
        - Visualization on host screen
 
    c. Even vs Odd Players
 
        - Need to draw this out !!!
        - JV - Even players is self-explanatory
        - JV - For odd players: there is a new first step - everyone answers questions alone for a round (not against anyone). At end of round, the lowest scorer becomes attached to the highest scorer (as if they lost to the winner in a 1v1 round). This makes it so there are an even number of players at the first round and gives an innitial advantage to the highest individual scorer.
 
    d. Determining winner
 
        - Most points win
 
        - Final battle between top 2/3 teams at the end for _#_ questions/minutes
 
        - Teammates answer questions too (for fewer points than main person)
 
        - Tug of war bar display
        - JV - Think it would be cool for the bar to be surging artificially a little bit (say the score is 20% of the bar to 80%, it moves a few percent left and right so it makes the battle look more intense. Can also have some illustrations on the outside of the board



    Style

        - Round corners

        - Soft font --> 

        - Simple shapes

        - Smooth/simple graphics

        - Use principles of color combination

            - not too vibrant

            - not too many different colors

        - Score/name displays on top of screen



2. Difference between Player/Host

    a. Player

        - Shows waiting message before game starts (tips/strategies ???)

        - Answers questions during game

    b. Host

        - Shows list of names before game starts

        - Displays rankings during game

        - Displays final battle



3. Create join portal/connecting all (JV ADD HERE)
    - JV - Innitial article that looks like it could help. Haven't gone and checked to make sure it is 100% feasable but regardless will be good starting point:
           https://rotemtam.medium.com/build-a-kahoot-clone-with-angularjs-and-firebase-b8b30891d968
           
    - JV - Here is the repository mentioned in article:
           https://github.com/rotemtam/kahootClone
           
    - JV - Will also suggested Socket.io for server type stuff
           
           
    a. Connecting all players via join code

    b. Creating central server

    c. Creating domain



FOR LATER:

4. Create accounts/login

5. Study set template

6. Customizeable win message written by winner prior to game

JV - Two API things that seem helpful: Bootstrap and phaser.io

SERVER:
For scalability (multiple game sessions) you'll probably want to look into MySQL to organize games. Have your SQL database keep track of PHP session IDs, their chosen nicknames, and the game room they're connected with. 

At the end of the day, it's going to take a lot of knowledge in a lot of different languages, but one of the biggest struggles is going to be getting all the separate layers to connect to each other. For instance, Your HTML needs to be interspersed with PHP and your PHP needs to be interfacing with MySQL, and your pages need to have JavaScript that interfaces with a Node in Node.js hosted on your server, and that Node needs to be updating your SQL database, and your desktop display app needs to be connecting to your node, and all the devices need to be getting updated when changes occur. Nightmare of connectivity.
