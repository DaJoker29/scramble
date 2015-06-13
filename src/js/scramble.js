var scramble = (function ( game ) {

    var TIME_LIMIT = 120;
    var SCORE = 5;

    var core = game.core = {};
    var timer, multiplier, word, scrambler, seconds, score, scrambled, stats, current, skip, reshuffle, extraTime; /*eslint no-unused-vars:0*/

    // Game Elements
    var timerEl = document.querySelector('#timer');
    var multiplierEl = document.querySelector('#multiplier');
    var scrambledEl = document.querySelector('#scrambled');
    var scoreEl = document.querySelector('#score');
    var answerEl = document.querySelector('#answer');
    var gameEl = document.querySelector('#game');

    // Statistics Elements
    var highScore = document.querySelector('#highScore');
    var gamesPlayed = document.querySelector('#gamesPlayed');
    var totalScore = document.querySelector('#totalScore');
    var lastScore = document.querySelector('#lastScore');
    var powerupsUsed = document.querySelector('#powerupsUsed');
    var favPowerup = document.querySelector('#favPowerup');
    var longestWord = document.querySelector('#longestWord');

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

    var _answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === current.toLowerCase()) {
            var points = SCORE * multiplier.get();
            score.add(points);
            multiplier.add();
            core.endTurn();
        }
    };

    var _addListeners = function () {
        answerEl.addEventListener( 'input', _answerListener);
    };

    var _removeListeners = function() {
        answerEl.removeEventListener('input', _answerListener);
    };

    var _checkHelpers = function () {
        skip = document.querySelector('#skip');
        reshuffle = document.querySelector('#reshuffle');
        extraTime = document.querySelector('#extraTime');
        var multi = multiplier.get();

        if (multi > 0) {
            skip.classList.remove('label-default');
            skip.classList.add('label-primary');
        } else {
            skip.classList.add('label-default');
            skip.classList.remove('label-primary');            
        }

        if (multi > 5) {
            reshuffle.classList.remove('label-default');
            reshuffle.classList.add('label-primary');
        } else {
            reshuffle.classList.add('label-default');
            reshuffle.classList.remove('label-primary');            
        }

        if (multi > 15) {
            extraTime.classList.remove('label-default');
            extraTime.classList.add('label-primary');
        } else {
            extraTime.classList.add('label-default');
            extraTime.classList.remove('label-primary');            
        }
    };

    var _statsUpdate = function() {
        _update(highScore, localStorage.highScore);
        _update(gamesPlayed, localStorage.gamesPlayed);
        _update(totalScore, localStorage.totalScore);
        _update(lastScore, localStorage.lastScore);
        // _update(powerupsUsed, localStorage.powerupsUsed);
        // _update(favPowerup, localStorage.favPowerup);
        // _update(longestWord, localStorage.longestWord);
    };

    core.init = function () {
        // Dependencies
        timer = game.timer;
        multiplier = game.multiplier;
        word = game.word;
        scrambler = game.scrambler;
        score = game.score;
        stats = game.stats;

        // Initialize
        word.init();
        stats.init();
        _checkHelpers();
        _statsUpdate();

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
        if ( parseInt( stats.get( 'highScore' ) ) < score.get() ) {
            stats.set( 'highScore', score.get() );
        }

        // Increment gamesPlayed
        stats.set( 'gamesPlayed', parseInt( stats.get( 'gamesPlayed') ) + 1 );

        // Cumulate Total Score
        stats.set( 'totalScore', parseInt( stats.get( 'totalScore' ) ) + score.get() );

        // Last Score
        stats.set( 'lastScore', score.get() );

        // Save stats
        stats.save();

        // Cleanup listeners
        _removeListeners();

        // Stop timers
        timer.stop();

        _statsUpdate();

        // Hide board
        [gameEl, skip, reshuffle, extraTime].forEach(function( el) {
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