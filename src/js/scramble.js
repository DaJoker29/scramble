var scramble = (function ( game ) {

    var core = game.core = {};
    var timer, multiplier, word, scrambler, score;

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

    return game;
} ( scramble || {} ));