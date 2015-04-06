var scramble = (function ( game ) {

    var score = game.score = {};
    var current;


    score.reset = function () {
        current = 0;
    };

    score.add = function ( pts ) {
        current += pts;
    };

    score.subtract = function ( pts ) {
        current -= pts;
    };

    score.get = function () {
        return current;
    };

    return game;
} ( scramble || {} ));