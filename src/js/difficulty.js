/**
 * Difficulty Module
 *
 * @namespace Difficulty
 * @memberOf Scramble
 */
var Scramble = (function (Game) {

    Game.Difficulty = {};

    /**
     * Save currently set difficulty
     * @public
     * @memberOf Scramble.Difficulty
     * 
     * @method saveDifficulty
     */
    Game.Difficulty.saveDifficulty = function() {
        localStorage.Difficulty = Game.Difficulty.current;
    };

    /**
     * Change difficulty
     * @public
     * @memberOf Scramble.Difficulty
     * 
     * @method updateDifficulty
     */
    Game.Difficulty.updateDifficulty = function() {
        if(document.querySelector('.active')) {
            var oldElement = document.querySelector('.active');
            oldElement.classList.remove('active');            
        }

        var element = document.querySelector('input[name=' + Game.Difficulty.current);
        element.checked = '';
        element.parentNode.classList.add('active');
    };

    return Game;
}( Scramble || {}));