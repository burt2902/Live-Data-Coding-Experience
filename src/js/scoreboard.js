class ScoreBoard {

    #gameInProgress = new Boolean();
    #homeTeam = new String();
    #awayTeam = new String();
    #homeScore = new Number();
    #awayScore = new Number();
    #board = [];
    #summary = [];
    #boardSorted = new Boolean();

    constructor() {
        this.#gameInProgress = false;
    }

    startGame(home, away) {
        if(typeof(home) !== 'string' || typeof(away) !== 'string' || away ==='' || home === '' )
            throw new Error('startGame: invalid parameters!');
        if(this.#gameInProgress == true)
            throw new Error('startGame: game already in progress!');
        this.#homeTeam = home;
        this.#awayTeam = away;
        this.#homeScore = 0;
        this.#awayScore = 0;
        this.#gameInProgress = true;
    }

    finishGame() {
        if(this.#gameInProgress == false)
            throw new Error('updateScore: game not started!');
        this.#gameInProgress = false;
        this.#board.unshift( { homeTeam:this.#homeTeam, awayTeam:this.#awayTeam, homeScore:this.#homeScore, awayScore:this.#awayScore } );
        this.#boardSorted = false;
    }

    updateScore(home, away) {
//        if(typeof(home) !== 'number' || typeof(away) !== 'number' || home < 0 || away < 0)
        if(isNaN(home) || isNaN(away) || home < 0 || away < 0)
            throw new Error('updateScore: invalid parameters!');
        if(this.#gameInProgress == false)
            throw new Error('updateScore: game not started!');
        this.#homeScore = home;
        this.#awayScore = away;
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