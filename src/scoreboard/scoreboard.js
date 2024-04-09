class ScoreBoard {
    
    #game = undefined;
    #board = [];
    #boardSorted = new Boolean();
    #summary = [];

    startGame(home, away) {
        if(typeof(home) !== 'string' || typeof(away) !== 'string' || away ==='' || home === '' )
            throw new Error('startGame: invalid parameters!');
        if(this.#game != undefined)
            throw new Error('startGame: game already in progress!');
        this.#game = { homeTeam:home, awayTeam:away, homeScore:0, awayScore:0 };    
    }

    finishGame() {
        if(this.#game == undefined)
            throw new Error('updateScore: game not started!');
        this.#board.unshift( this.#game );
        this.#game = undefined;
        this.#boardSorted = false;
    }

    updateScore(home, away) {
        if(isNaN(home) || isNaN(away) || home < 0 || away < 0)
            throw new Error('updateScore: invalid parameters!');
        if(this.#game == undefined)
            throw new Error('updateScore: game not started!');
        this.#game.homeScore = home;
        this.#game.awayScore = away;
    }

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