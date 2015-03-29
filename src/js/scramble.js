/**
 * Initialization Module
 *
 * @constructor
 * @namespace
 * @public
 */
var Scramble = (function( Game ){

    /**
     * Standard 'onclick' event object
     * @typedef {Object} ClickEvent
     */
    
    /**
     * Standard 'oninput' event object
     * @typedef {Object} InputEvent
     */

    /**
     * @private
     * @memberOf Scramble
     */
    var input = document.querySelector('#answer');
    /**
     * @private
     * @memberOf Scramble
     */
    var DifficultySelect = document.querySelector('#DifficultySelect');
    /**
     * @private
     * @memberOf Scramble
     */
    var modal = document.querySelector('#success-modal');
    /**
     * @private
     * @memberOf Scramble
     */
    var highlight = document.querySelector('form');
    /**
     * @private
     * @memberOf Scramble
     */
    var highlightToggle = document.querySelector('#highlight-toggle');

    /**
     * Toggle `Answer Highlight` option
     * @private
     * @memberOf Scramble
     * 
     * @function
     */
    var _toggleListener = function() {
        Game.Highlight.toggle();
    };

    /**
     * Toggle Difficulty option
     * @private
     * @memberOf Scramble
     *
     * @function
     * 
     * @param  {ClickEvent} e EventObject on selected difficulty
     */
    var _difficultyListener = function ( e ) {
         if (e.target !== e.currentTarget && e.target.type === 'radio') {
            if (['easy', 'medium', 'hard', 'stupid'].indexOf(e.target.name) > -1) {
                Game.Difficulty.current = e.target.name;
                Game.Difficulty.saveDifficulty();
                Game.destroy();
            }
        }
        e.stopPropagation();
        input.focus();
    };

    /**
     * Check input and set background if `Answer Highlight` on
     * @private
     * @memberOf Scramble
     *
     * @function
     * 
     * @param  {InputEvent} e EventObject holding field content
     */
    var _highlightListener = function( e ) {
        if(localStorage.Highlight === 'on') {
            if(e.target.value.length === 0)
            {
                highlight.style.backgroundColor = '';
            } else if (Game.Word.current.toLowerCase().lastIndexOf(e.target.value.toLowerCase(), 0) === 0) {
                highlight.style.backgroundColor = 'limegreen';
            } else{
                highlight.style.backgroundColor = 'tomato';
            }
        }
    };

    /**
     * Check user input for correct answer
     * @private
     * @memberOf Scramble
     *
     * @function
     * 
     * @param  {InputEvent} e EventObject holding field content
     */
    var _answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === Game.Word.current.toLowerCase()) {
            $('#correctLabel').toggleClass('invisible');
            setTimeout(function() {
                $('#correctLabel').toggleClass('invisible');
            }, 1200);

            Game.Score.add(Game.Difficulty.current);
            input.value = '';
            Game.destroy();
        }
    };

    /**
     * End current instance of Game and call another
     * @public
     * @memberOf Scramble
     */
    Game.destroy = function() {
        Game.Multiplier.stop();        
        window.Scramble = Game;
        DifficultySelect.removeEventListener('click', _difficultyListener);
        input.removeEventListener('input', _answerListener);
        input.removeEventListener('input', _highlightListener);
        highlightToggle.removeEventListener( 'click', _toggleListener);
        highlight.style.backgroundColor = '';
        window.Scramble.run();
    };

    /**
     * Start a new instance of Game
     * @public
     * @memberOf Scramble
     */
    Game.run = function() {
        if (localStorage.Difficulty) {
            Game.Difficulty.current = localStorage.Difficulty;
            Game.Difficulty.updateDifficulty();
        } else {
            Game.Difficulty.current = 'easy';
            Game.Difficulty.saveDifficulty();
            Game.Difficulty.updateDifficulty();
        }

        if(localStorage.Highlight === 'on') {
            var toggle = document.querySelector('#highlight-toggle');
            toggle.setAttribute('aria-pressed', true);
            toggle.classList.add('active');
        }

        Game.Score.update();
        Game.Word.set();

        input.addEventListener( 'input', _answerListener);
        input.addEventListener( 'input', _highlightListener);
        DifficultySelect.addEventListener( 'click', _difficultyListener);
        highlightToggle.addEventListener( 'click', _toggleListener);

        Game.Multiplier.start();
    };

    return Game;
}(Scramble || {}));