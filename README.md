# Live Data Coding Experience
 Implementation of the Football World Cup Score Board as a simple library

## Project description
The boards support the following operations:
1. **Start a game**.  
When a game starts, it should capture (being initial score 0-0) 
   - Home team
   - Away Team
2. **Finish a game**  
It will remove a match from the scoreboard. 
3. **Update score**  
Receiving the pair score; home team score and away team score updates a game score.
4. **Get a summary of games by total score**.  
Those games with the same total score will be returned ordered by the most recently added to our system.


## ScoreBoard class description
 The ScoreBoard class provides below methods addressing the above requirements. It does not provide additional getters to query for e.g. current score, teams' names or game status. All methods are synchrounous, no promise mechanisms are used.

### startGame(home, away)  
Starts the game with initial score 0-0.  
No other game can be in progress for this method to succeed.

Params: home - home team name, away - away team name.  
Returns: nothing, throws an exception on error.

### finishGame()  
Finishes the game and stores the score.  
The game has to be in progress for this method to succeed.

Params: none.  
Returns: nothing, throws an exception on error.

### updateScore(home, away)   
Updates the game score.  
The game has to be in progress for this method to succeed.

Params: home - home team score, away - away team score.  
Returns: nothing, throws an exception on error.

### getSummary()  
Gets the summary of all finished games sorted by total score descending. Games with the same total score are sorted from newest to oldest.  
Method can be called at any time.

Params: none.  
Returns: a sorted list of all finished games.


## Assumptions
 It is assumed that the amout of games data to process is going to be low. Basing on that assumption:
 - sorting does not have to be super efficient;
 - sorting compare function and how finished games data is stored guarantees that games with the same total score will be sorted newest to oldest; there is no need for storing additional information like e.g. timestamp or game number.


## Project directories
- src - Contains all project sources and README.md file
    - scoreboard
        - scoreboard.js - JavaScript imlementation of a ScoreBoard class
    - test
        - test[.html|.js] - Automated API and functional tests
        - manualTestPage[.html|.js] - Test page for manual testing
