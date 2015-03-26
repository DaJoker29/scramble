scramble = (function ( game ) {

    var multiplier = document.querySelector('#multiplier');
    var parent = multiplier.parentNode;
    var interval;

    game.multiplier = {};

    var display = function() {
        multiplier.textContent = game.multiplier.current.toFixed(1);
    };

    game.multiplier.stop = function() {
        clearInterval(interval);
        parent.className = 'label label-success';
    };

    game.multiplier.start = function() {
        var current = game.multiplier.current = 2.2;
        display();
        interval = setInterval(function() {
            if(game.multiplier.current > 0.1) {
                current = game.multiplier.current -= 0.1;
                display();

                if(current < 1.6 && current > 1.2) {
                    parent.classList.remove('label-success');
                    parent.classList.add('label-info');
                } else if (current < 1.2 && current > 0.8) {
                    parent.classList.remove('label-info');
                    parent.classList.add('label-warning');
                } else if (current < 0.8) {
                    parent.classList.remove('label-warning');
                    parent.classList.add('label-danger');
                }
            }
        }, 1000);            
    };

    return game;
}( scramble || {} ));