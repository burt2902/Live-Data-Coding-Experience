// Get access to logging TextArea 
const tatestlog = document.getElementById('tatestlog');

// Hijack console logger
(function(){
    var oldLog = console.log;
    console.log = function (message) {
        oldLog.apply(console, arguments);
        tatestlog.append(message + '\n');
    };
})();


// Helper function to gather test cases common code
function runTest(testFunc, testCaseDesc) {
    try {
        console.log('TEST CASE: ' + testCaseDesc)
        board = new ScoreBoard();
        testFunc(board);
        console.log('OK\n');
    } catch(err) {
        console.log('ERROR: ' + err + '\n');
    }
    if(typeof(board) !== null)
        delete(board);
}


// Helper function for calling methods that are expected to throw expections
function EXPECT_EXCEPTION(func) {
    try {
        func();
    } catch(err) {
        console.log('Exception received: ' + err.message);
        return;
    }
    throw new Error('Exception missing!');
}



// Test cases
function tc_StartGameInvalidParams(board) {
    EXPECT_EXCEPTION(function(){ return board.startGame(); });
    EXPECT_EXCEPTION(function(){ return board.startGame('h'); });
    EXPECT_EXCEPTION(function(){ return board.startGame('a', 15); });
}

function tc_StartGameProperParams(board) {
    board.startGame('h', "a");
}

function tc_StartGameWhenAnotherGameInProgress(board) {
    board.startGame('h', "a");
    EXPECT_EXCEPTION(function(){ return board.startGame('h', 'a'); });
}

function tc_UpdateScoreInvalidParams(board) {
    board.startGame('h', "a");
    EXPECT_EXCEPTION(function(){ return board.updateScore(); });
    EXPECT_EXCEPTION(function(){ return board.updateScore('h'); });
    EXPECT_EXCEPTION(function(){ return board.updateScore('a', 15); });
    EXPECT_EXCEPTION(function(){ return board.updateScore(5, -1); });
}

function tc_UpdateScoreProperParams(board) {
    board.startGame('h', "a");
    board.updateScore(0, 1);
    board.updateScore(1, 1);
    board.updateScore(20, 10);
    board.updateScore(10, 5);
}

function tc_UpdateScoreWhenNoGameInProgress(board) {
    EXPECT_EXCEPTION(function(){ return board.updateScore(1, 1); });
}

function tc_FinishGameWhenGameInProgress(board) {
    board.startGame('h', "a");
    board.finishGame();
}

function tc_FinishGameWhenNoGameInProgress(board) {
    EXPECT_EXCEPTION(function(){ return board.finishGame(); });
}


// Run test cases
runTest(tc_StartGameInvalidParams, 'startGame() with invalid params');
runTest(tc_StartGameProperParams, 'startGame() with proper params');
runTest(tc_StartGameWhenAnotherGameInProgress, 'startGame() when another game is in progress');
runTest(tc_UpdateScoreInvalidParams, 'updateScore() with invalid params');
runTest(tc_UpdateScoreProperParams, 'updateScore() with proper params');
runTest(tc_UpdateScoreWhenNoGameInProgress, 'updateScore() when no game is in progress');
runTest(tc_FinishGameWhenGameInProgress, 'finishGame() when game is in progress');
runTest(tc_FinishGameWhenNoGameInProgress, 'finishGame() when no game is in progress');
