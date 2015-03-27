Scramble = (function ( game ) {

    var Multiplier = document.querySelector('#Multiplier');
    var parent = Multiplier.parentNode;
    var interval;

    game.Multiplier = {};

    var _display = function() {
        Multiplier.textContent = 'x' + game.Multiplier.current.toFixed(1);
    };

    game.Multiplier.stop = function() {
        clearInterval(interval);
        parent.className = 'label label-info';
    };

    game.Multiplier.start = function() {
        var current = game.Multiplier.current = 2.2;
        _display();
        interval = setInterval(function() {
            if(game.Multiplier.current > 0.1) {
                current = game.Multiplier.current -= 0.1;
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

    return game;
}( Scramble || {} ));