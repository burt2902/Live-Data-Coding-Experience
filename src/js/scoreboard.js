class ScoreBoard {

    #gameInProgress = new Boolean();
    #homeTeam = new String();
    #awayTeam = new String();
    #homeScore = new Number();
    #awayScore = new Number();
    #board = [];

    constructor() {
        this.#gameInProgress = false;
    }

    startGame(home, away) {
        if(typeof(home) !== 'string' || typeof(away) !== 'string')
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
        this.#board.push( [this.#homeTeam, this.#homeScore, this.#awayTeam, this.#awayScore] );
    }

    updateScore(home, away) {
        if(typeof(home) !== 'number' || typeof(away) !== 'number' || home < 0 || away < 0)
            throw new Error('updateScore: invalid parameters!');
        if(this.#gameInProgress == false)
            throw new Error('updateScore: game not started!');
        this.#homeScore = home;
        this.#awayScore = away;
    }

    *getSummary() {
        console.log(this.#board);
        throw new Error('Not implemented!');
    }
}