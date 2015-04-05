var scramble = (function( game ) {

    var timer = game.timer = {};
    var id = null;

    timer.start = function ( callback, interval ) {
        if (id === null) {
            id = setInterval(function() {
                callback();
            }, interval);
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