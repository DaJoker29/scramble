/**
 * Score Module
 *
 * @namespace Score
 * @memberOf Scramble
 */
var Scramble = (function (Game) {
    
    Game.Score = {};

    /**
     * @private
     * @memberOf Scramble.Score
     */
    var ScoreEl = document.querySelector('#Score');

    /**
     * Update current score
     * @public
     * @memberOf Scramble.Score
     *
     * @function update
     */
    Game.Score.update = function() {
        ScoreEl.textContent = localStorage.Score = localStorage.Score || 0;
    };

    /**
     * Clear current score
     * @public
     * @memberOf Scramble.Score
     *
     * @function clear
     */
    Game.Score.clear = function() {
        localStorage.Score = 0;
        Game.Score.update();
    };

    /**
     * Add to current score based on either input points or difficulty
     * @public
     * @memberOf Scramble.Score
     *
     * @function add
     * @param {number|string} input Number (points) or String (difficulty)
     */
    Game.Score.add = function ( input ) {
        if(typeof(input) === 'number') {
            pts = input;
        } else {
            switch(input) {
                case 'easy': 
                    pts = 10;
                    break;
                case 'medium':
                    pts = 15;
                    break;
                case 'hard':
                    pts = 25;
                    break;
                case 'stupid':
                    pts = 50;
                    break;
                default: 
                    pts = 0;
            }
            if(Game.Highlight.current === 'on') {
                pts = Math.floor(pts / 2);
            }
        }

        var Multiplier = Game.Multiplier.current.toFixed(1);
        var newScore = pts * Multiplier;
        localStorage.Score = parseInt(localStorage.Score) + Math.floor(newScore);
        Game.Score.update();
    };

    return Game;
}(Scramble || {}));