var scramble = (function ( game ) {

    var multiplier = game.multiplier = {};
    var current;

    multiplier.add = function ( value ) {
        current += value || 1;
    };

    multiplier.subtract = function ( value ) {
        current -= value || 1;
    };

    multiplier.reset = function () {
        current = 1;
    };

    multiplier.get = function() {
        return current;
    };

    return game;
} ( scramble || {}));