/**
 * Word Module
 *
 * @namespace Word
 * @memberOf Scramble
 */
var Scramble = (function ( Game ) {

    Game.Word = {};
    Game.Word.current = '';

    /**
     * Shuffle string
     * @global
     *
     * @method
     * @return {String} Shuffled String
     */
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

    /**
     * Retrive word from dictionary
     * @private
     * @memberOf Scramble.Word
     *
     * @function
     *
     * @param  {Function} callback Function to pass data to
     */
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

    /**
     * Display scrambled word
     * @private
     * @memberOf Scramble.Word
     *
     * @function
     */
    var _draw = function() {
        var element = document.querySelector('#scrambled');
        var scrambled = Game.Word.current.shuffle();
        element.textContent = scrambled.toUpperCase();

        // Print unscrambled word out to console
        console.log(scrambled + ' => ' + Game.Word.current.toUpperCase());
    };

    /**
     * Select word to scramble
     * @public
     * @memberOf Scramble.Word
     *
     * @function
     */
    Game.Word.set = function() {
        _getJSON(function(response) {
            result = JSON.parse(response);
            var index = Math.floor(Math.random() * (result[Game.Difficulty.current].length));

            Game.Word.current = result[Game.Difficulty.current][index];
            _draw();
        });
    };

    return Game;
}( Scramble || {}));