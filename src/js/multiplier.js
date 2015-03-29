/**
 * Multiplier Module
 *
 * @namespace Multiplier
 * @memberOf Scramble
 */
Scramble = (function ( Game ) {

    var Multiplier = document.querySelector('#Multiplier');
    var parent = Multiplier.parentNode;
    var interval;

    Game.Multiplier = {};


    /**
     * Display current multiplier
     * @private
     * @memberOf Scramble.Multiplier
     *
     * @function
     */
    var _display = function() {
        Multiplier.textContent = 'x' + Game.Multiplier.current.toFixed(1);
    };

    /**
     * Stop Multiplier and reset background
     * @public
     * @memberOf Scramble.Multiplier
     *
     * @function stop
     */
    Game.Multiplier.stop = function() {
        clearInterval(interval);
        parent.className = 'label label-info';
    };

    /**
     * Start Multiplier
     * @public
     * @memberOf Scramble.Multiplier
     *
     * @function start
     */
    Game.Multiplier.start = function() {
        var current = Game.Multiplier.current = 2.2;
        _display();
        interval = setInterval(function() {
            if(Game.Multiplier.current > 0.1) {
                current = Game.Multiplier.current -= 0.1;
                _display();

                if(current < 1.6 && current > 1.2) {
                    parent.classList.remove('label-info');
                    parent.classList.add('label-primary');
                } else if (current < 1.2 && current > 0.8) {
                    parent.classList.remove('label-primary');
                    parent.classList.add('label-warning');
                } else if (current < 0.8) {
                    parent.classList.remove('label-warning');
                    parent.classList.add('label-danger');
                }
            }
        }, 1000);            
    };

    return Game;
}( Scramble || {} ));