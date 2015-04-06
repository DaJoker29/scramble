var scramble = (function ( game ) {

    game.scrambler = function ( word ) {
        var arr = word.split('');
        var length = arr.length;

        for( var i = length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr.join('');
    };

    return game;
} ( scramble || {} ));