/**
 * Highlight Module
 *
 * @namespace Highlight
 * @memberOf Scramble
 */
var Scramble = (function ( Game ) {
    
    Game.Highlight = {};
    /**
     * Highlight option
     * @public
     * @memberOf Scramble.Highlight
     * 
     * @var current
     */
    Game.Highlight.current = localStorage.Highlight = localStorage.Highlight || 'off';

    /**
     * Toggle Highlight option
     * @public
     * @memberOf Scramble.Highlight
     * 
     * @method toggle
     */
    Game.Highlight.toggle = function() {
        if(Game.Highlight.current === 'off') {
            Game.Highlight.current = localStorage.Highlight = 'on';
        } else {
            Game.Highlight.current = localStorage.Highlight = 'off';
            var el = document.querySelector('form');
            el.style.backgroundColor = '';
            Game.destroy();
        }
    };

    return Game;
}( Scramble || {}));