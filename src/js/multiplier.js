var scramble = (function ( game ) {

    var multiplier = game.multiplier = {};
    var current, id;

    multiplier.start = function ( interval, max, min ) {
        var INTERVAL = interval || 2500;
        var MAX = max || 2.2;
        var MIN = min || 0.1;

        // Set initial multiplier
        current = MAX;

        // start countdown
        id = setInterval(function() {
            if(current > MIN) {
                current -= 0.1;
            } else {
                multiplier.stop();
            }
        }, INTERVAL);
    };

    multiplier.stop = function() {
        clearInterval(id);
    };

    multiplier.get = function() {
        return current.toFixed(1);
    };

    return game;
} ( scramble || {}));