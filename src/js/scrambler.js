var scramble = (function ( game ) {

    game.scrambler = function ( word ) {
        var arr = word.split('');
        var length = arr.length;

        do {
            for( var i = length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        } while ( arr.join('') === word );
        return arr.join('');
    };

    return game;
} ( scramble || {} ));