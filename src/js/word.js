var Scramble = (function ( game ) {

    game.Word = {};
    game.Word.current = '';

    String.prototype.shuffle = function() {
        var a = this.split('');
        var n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join('');
    };

    var _getJSON = function(callback) {
        var request = new XMLHttpRequest();
        request.open('GET', 'dictionary.json', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            }
        };

        request.send();
    };

    var _draw = function() {
        var element = document.querySelector('#scrambled');
        var scrambled = game.Word.current.shuffle();
        element.textContent = scrambled.toUpperCase();

        // Print unscrambled word out to console
        console.log(scrambled + ' => ' + game.Word.current.toUpperCase());
    };

    game.Word.set = function() {
        _getJSON(function(response) {
            result = JSON.parse(response);
            var index = Math.floor(Math.random() * (result[game.Difficulty.current].length));

            game.Word.current = result[game.Difficulty.current][index];
            _draw();
        });
    };

    return game;
}( Scramble || {}));