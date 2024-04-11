class ScoreBoard {
    
    #game = undefined;
    #board = [];
    #boardSorted = new Boolean();
    #summary = [];

    /**
    * Starts the game with initial score 0-0.
    * No other game can be in progress for this method to succeed.
    * @param {String} home Home team.
    * @param {String} away Away team.
    * @throws {Error}
    */
    startGame(home, away) {
        if(typeof(home) !== 'string' || typeof(away) !== 'string' || away ==='' || home === '' )
            throw new Error('startGame: invalid parameters!');
        if(this.#game != undefined)
            throw new Error('startGame: game already in progress!');
        this.#game = { homeTeam:home, awayTeam:away, homeScore:0, awayScore:0 };    
    }

    /**
    * Finishes the game and stores the score.
    * The game has to be in progress for this method to succeed.
    * @throws {Error}
    */
    finishGame() {
        if(this.#game == undefined)
            throw new Error('updateScore: game not started!');
        this.#board.unshift( this.#game );
        this.#game = undefined;
        this.#boardSorted = false;
    }

    /**
    * Updates game's score.
    * The game has to be in progress for this method to succeed.
    * @param {Number} home Home team score.
    * @param {Number} away Away team score.
    * @throws {Error}
    */
    updateScore(home, away) {
        var h = parseFloat(home);
        var a = parseFloat(away);
        if(isNaN(home) || isNaN(away) || (h | 0) !== h || (a | 0) !== a || home < 0 || away < 0)
            throw new Error('updateScore: invalid parameters!');
        if(this.#game == undefined)
            throw new Error('updateScore: game not started!');
        this.#game.homeScore = home;
        this.#game.awayScore = away;
    }

    /**
    * Returns the summary of all finished games sorted by total score descending.
    * Games with the same total score are sorted from newest to oldest.
    * @return {Array<String>}
    */
    getSummary() {
        // Sort entries, prevent from sorting until new games are added
        if(this.#boardSorted == false) {
            this.#board.sort( function(a, b)  {return b.homeScore + b.awayScore - a.homeScore - a.awayScore } );
            this.#boardSorted == true;
            this.#summary =  [];
            for(var n=0; n<this.#board.length; n++) {
                this.#summary.push( this.#board[n].homeTeam + ' ' + this.#board[n].homeScore + ' - ' + this.#board[n].awayTeam + ' ' + this.#board[n].awayScore );
            }
        }
        return this.#summary;
    }
}