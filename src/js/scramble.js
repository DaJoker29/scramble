var scramble = (function ( game ) {

    var TIME_LIMIT = 120;
    var SCORE = 5;

    var core = game.core = {};
    var timer, multiplier, word, scrambler, score, scrambled, current;

    var timerEl = document.querySelector('#timer');
    var multiplierEl = document.querySelector('#multiplier');
    var scrambledEl = document.querySelector('#scrambled');
    var scoreEl = document.querySelector('#score');
    var answerEl = document.querySelector('#answer');
    var gameEl = document.querySelector('#game');
    var highEl = document.querySelector('#highScore');

    var _update = function( element, value) {
        element.textContent = value;
    };

    var _timerCallback = function () {
        if (seconds <= 0) {
            core.quit();
        } else {
            seconds -= 1;

            _update( timerEl, seconds);
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
            var points = SCORE * multiplier.get();
            score.add(points);
            multiplier.add();
            core.endTurn();
        }
    };

    var _checkHelpers = function () {
        var skip = document.querySelector('#skip');
        var reshuffle = document.querySelector('#reshuffle');
        var extraTime = document.querySelector('#extraTime');
        var current = multiplier.get();

        if (current > 0) {
            skip.style.visibility = 'visible';
        } else {
            skip.style.visibility = 'hidden';
        }

        if ( current > 5 ) {
            reshuffle.style.visibility = 'visible';
        } else {
            reshuffle.style.visibility = 'hidden';
        }

        if ( current > 10 ) {
            extraTime.style.visibility = 'visible';
        } else {
            extraTime.style.visibility = 'hidden';
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
        _checkHelpers();
        _update(highEl, localStorage.highScore || 0);
    };

    core.newGame = function () {
        // Initialize values
        seconds = TIME_LIMIT;
        score.reset();
        multiplier.reset();

        // Show board
        gameEl.style.visibility = 'visible';

        // Start game timer
        timer.start(_timerCallback);

        // Start listening
        _addListeners();

        // Start turn
        core.startTurn();
    };

    core.quit = function() {

        // Check high score
        if ( localStorage.getItem('highScore') === null || parseInt( localStorage.highScore ) < score.get() ) {
            localStorage.highScore = score.get();
        }

        // Cleanup listeners
        _removeListeners();

        // Stop timers
        timer.stop();

        _update(highEl, localStorage.highScore || 0);

        // Hide board
        [gameEl, skip, reshuffle, extraTime].forEach (function( el) {
            el.style.visibility = 'hidden';
        });
    };

    core.endTurn = function() {
        // Clear input
        answerEl.value = '';

        core.startTurn();
    };

    core.startTurn = function() {
        // Initialize values
        word.pick();
        current = word.get();
        console.log(current); // Cheater
        
        // Initialize board
        _update( scoreEl, score.get());
        _update( scrambledEl, scrambler( word.get() ) );
        _update( multiplierEl, multiplier.get());
        _update( timerEl, seconds);
        _checkHelpers();
    };

    core.skip = function() {
        if (multiplier.get() > 1) {
            multiplier.subtract();
        }

        _update( multiplierEl, multiplier.get());
        _checkHelpers();

        core.endTurn();
    };

    core.reshuffle = function () {
        multiplier.subtract( 5 );
        _update( multiplierEl, multiplier.get());
        _checkHelpers();

        _update(scrambledEl, scrambler ( word.get() ) );
    };

    core.extraTime = function () {
        multiplier.subtract( 10 );
        _update( multiplierEl, multiplier.get());
        _checkHelpers();

        seconds += 60;
    };

    return game;
} ( scramble || {} ));