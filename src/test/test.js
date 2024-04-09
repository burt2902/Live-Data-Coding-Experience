// Get access to logging TextArea 
const tatestlog = document.getElementById('tatestlog');

// Hijack console logger
(function(){
    var oldLog = console.log;
    console.log = function (message) {
        oldLog.apply(console, arguments);
        tatestlog.append(message + '\n');
        tatestlog.scrollTop = tatestlog.scrollHeight;
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
        console.log('Expected exception received: ' + err.message);
        return;
    }
    throw new Error('Exception missing!');
}



// Test cases
function tc_StartGameInvalidParams(board) {
    EXPECT_EXCEPTION(function(){ return board.startGame(); });
    EXPECT_EXCEPTION(function(){ return board.startGame('h'); });
    EXPECT_EXCEPTION(function(){ return board.startGame('h', 15); });
    EXPECT_EXCEPTION(function(){ return board.startGame('', 'a'); });
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
    EXPECT_EXCEPTION(function(){ return board.updateScore(NaN, -1); });
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
    board.startGame('h', "a");
    board.finishGame();
    EXPECT_EXCEPTION(function(){ return board.finishGame(); });
}



function verifySummary(board, expectedSummary) {
    var summary = JSON.stringify(board.getSummary());
    console.log(summary);
    if(summary != expectedSummary)
        throw new Error('Expected summary ' + expectedSummary + ', but received ' + summary);
}

function tc_GetSummary(board) {
    // No game started
    verifySummary(board, '[]');
    // Game started but not finished yet
    board.startGame('H1', "A1");
    board.updateScore(1, 1);
    verifySummary(board, '[]');
    // 1st game finished
    board.finishGame();
    verifySummary(board, '["H1 1 - A1 1"]');
    // 2nd game finished
    board.startGame('H2', "A2");
    board.updateScore(0, 1);
    board.finishGame();
    verifySummary(board, '["H1 1 - A1 1","H2 0 - A2 1"]');
    // 3rd game finished
    board.startGame('H3', "A3");
    board.updateScore(0, 2);
    board.finishGame();
    verifySummary(board, '["H3 0 - A3 2","H1 1 - A1 1","H2 0 - A2 1"]');
}

function tc_GetSummaryFromExcercise(board) {
    // 1st game
    board.startGame('Mexico', 'Canada');
    board.updateScore(0, 5);
    board.finishGame();
    // 2nd game finished
    board.startGame('Spain', 'Brazil');
    board.updateScore(10, 2);
    board.finishGame();
    // 3rd game finished
    board.startGame('Germany', 'France');
    board.updateScore(2, 2);
    board.finishGame();
    // 4th game finished
    board.startGame('Uruguay', 'Italy');
    board.updateScore(6, 6);
    board.finishGame();
    // 5th game finished
    board.startGame('Argentina', 'Australia');
    board.updateScore(3, 1);
    board.finishGame();
    // Validate
    verifySummary(board, '["Uruguay 6 - Italy 6","Spain 10 - Brazil 2","Mexico 0 - Canada 5","Argentina 3 - Australia 1","Germany 2 - France 2"]' );
}


// Run test cases
function runTests() {
    runTest(tc_StartGameInvalidParams, 'startGame() with invalid params');
    runTest(tc_StartGameProperParams, 'startGame() with proper params');
    runTest(tc_StartGameWhenAnotherGameInProgress, 'startGame() when another game is in progress');
    runTest(tc_UpdateScoreInvalidParams, 'updateScore() with invalid params');
    runTest(tc_UpdateScoreProperParams, 'updateScore() with proper params');
    runTest(tc_UpdateScoreWhenNoGameInProgress, 'updateScore() when no game is in progress');
    runTest(tc_FinishGameWhenGameInProgress, 'finishGame() when game is in progress');
    runTest(tc_FinishGameWhenNoGameInProgress, 'finishGame() when no game is in progress');
    runTest(tc_GetSummary, 'getSummary() test');
    runTest(tc_GetSummaryFromExcercise, 'getSummary() test - data provided with the excercise');
}

runTests();