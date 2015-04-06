var scramble = (function ( game ) {

    var TIME_LIMIT = 120;
    var SCORE = 50;

    var core = game.core = {};
    var timer, multiplier, word, scrambler, score, scrambled, current;

    var timerEl = document.querySelector('#timer');
    var multiplierEl = document.querySelector('#multiplier');
    var scrambledEl = document.querySelector('#scrambled');
    var scoreEl = document.querySelector('#score');
    var answerEl = document.querySelector('#answer');

    var _update = function( element, value) {
        element.textContent = value;
    };

    var _timerCallback = function () {
        if (seconds <= 0) {
            core.quit();
        } else {
            seconds -= 1;

            _update( timerEl, seconds);
            _update( multiplierEl, multiplier.get() );
        }
    };

    var _addListeners = function () {
        answerEl.addEventListener( 'input', _answerListener);
    };

    var _removeListeners = function() {
        answerEl.removeEventListener('input', _answerListener);
    };

    var _answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === current.toLowerCase()) {
            var points = SCORE * parseFloat( multiplier.get() );
            score.add(points);
            answerEl.value = '';
            core.endTurn();
        }
    };

    core.init = function () {
        // Dependencies
        timer = game.timer;
        multiplier = game.multiplier;
        word = game.word;
        scrambler = game.scrambler;
        score = game.score;

        // Initialize
        word.init();
    };

    core.newGame = function () {
        // Initialize values
        seconds = TIME_LIMIT;
        score.reset();

        // Start game timer
        timer.start(_timerCallback);

        // Start listening
        _addListeners();

        // Start turn
        core.startTurn();
    };

    core.quit = function() {

        // Cleanup listeners
        _removeListeners();

        // Stop timers
        timer.stop();
        multiplier.stop();
    };

    core.endTurn = function() {
        // reset multiplier
        multiplier.stop();

        core.startTurn();
    };

    core.startTurn = function() {
        // Initialize values
        word.pick();
        current = word.get();
        console.log(current);

        // start multiplier
        multiplier.start();
        
        // Initialize board
        _update( scoreEl, score.get());
        _update( scrambledEl, scrambler( word.get() ) );
        _update( multiplierEl, multiplier.get());
        _update( timerEl, seconds);
    };

    return game;
} ( scramble || {} ));