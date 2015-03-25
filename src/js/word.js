var scramble = (function ( game ) {

    game.word = {};
    game.word.current = '';

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

    var getJSON = function(callback) {
        var request = new XMLHttpRequest();
        request.open('GET', 'dictionary.json', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            }
        };

        request.send();
    };

    var draw = function() {
        var element;
        game.word.scrambled = game.word.current.shuffle();
        console.log(game.word.scrambled + ' => ' + game.word.current.toUpperCase()); // For cheating

        if(document.querySelector('#scrambled')) {
            element = document.querySelector('#scrambled');
            element.innerHTML = 'The word to unscramble is: <mark><strong>' + game.word.scrambled.toUpperCase() + '</strong></mark>';
        } else {
            var page = document.querySelector('main');
            element = document.createElement('h3');
            element.id = 'scrambled';
            element.classList.add('well');
            element.innerHTML = 'The word to unscramble is: <mark><strong>' + game.word.scrambled.toUpperCase() + '</strong></mark>';
            page.appendChild(element);
        }
    };

    game.word.set = function() {
        getJSON(function(response) {
            result = JSON.parse(response);
            var index = Math.floor(Math.random() * (result[game.diff.current].length));

            game.word.current = result[game.diff.current][index];
            draw();
        });
    };

    return game;
}( scramble || {}));