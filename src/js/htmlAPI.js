// Get access to logging TextArea 
const tatestlog = document.getElementById('talog');

// Hijack console logger
(function(){
    var oldLog = console.log;
    console.log = function (message) {
        oldLog.apply(console, arguments);
        tatestlog.append(message + '\n');
        tatestlog.scrollTop = tatestlog.scrollHeight;
    };
})();

// Create score board
const scoreBoard = new ScoreBoard();


// Start game
function startGame() {
    try {
        console.log('Calling startGame() method...');
        var homeTeam = document.getElementById('thometeam').value;
        var awayTeam = document.getElementById('tawayteam').value;
        scoreBoard.startGame(homeTeam, awayTeam);
        document.getElementById('lhometeam').innerText = homeTeam;
        document.getElementById('lawayteam').innerText = awayTeam;
        document.getElementById('lhomescore').innerText = 0;
        document.getElementById('lawayscore').innerText = 0;
        console.log('Success');
    } catch(err) {
        console.log(err.message);
    }
}


// Update score
function updateScore() {
    try {
        console.log('Calling updateScore() method...');
        var homeTeamScore = parseInt(document.getElementById('nhomescore').value);
        var awayTeamScore = parseInt(document.getElementById('nawayscore').value);
        scoreBoard.updateScore(homeTeamScore, awayTeamScore);
        document.getElementById('lhomescore').innerText = homeTeamScore;
        document.getElementById('lawayscore').innerText = awayTeamScore;
        console.log('Success');
    } catch(err) {
        console.log(err.message);
    }
}


// Finish game
function finishGame() {
    try {
        console.log('Calling finishGame() method...');
        scoreBoard.finishGame();
        console.log('Success');
    } catch(err) {
        console.log(err.message);
    }
}


// Get summary
function getSummary() {
    try {
        console.log('Calling getSummary() method...');
        var taSummary = document.getElementById('tasummary');
        taSummary.innerText = '';

        var summary = scoreBoard.getSummary();
        for(var n=0; n<summary.length; n++) {
            taSummary.append(summary[n] + '\n');
        }

        console.log('Success');
    } catch(err) {
        console.log(err.message);
    }
}