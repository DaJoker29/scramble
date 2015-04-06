var scramble = (function( game ) {

    var timer = game.timer = {};
    var id = null;

    timer.start = function ( callback, interval ) {
        var INTERVAL = interval || 1000;

        if (id === null) {
            id = setInterval(function() {
                callback();
            }, INTERVAL);
        }
    };

    timer.stop = function( callback ) {
        clearInterval(id);
        id = null;

        if(callback) {
            callback();
        }
    };

    return game;
}( scramble || {}));