var scramble = (function ( game ) {

    var word = game.word = {};
    var current, list;

    var _getJSON = function ( callback ) {
        var request = new XMLHttpRequest();
        request.open('GET', 'dictionary.json', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            }
        };

        request.send();
    };

    word.init = function() {
        if(typeof list === 'undefined') {
            _getJSON( function( data) {
                list = JSON.parse(data);
            });
        } 
    };

    word.pick = function() {
        var index = random(0, list.words.length);
        current = list.words[index];
    };

    word.get = function() {
        return current;
    };

    return game;
}( scramble || {} ));