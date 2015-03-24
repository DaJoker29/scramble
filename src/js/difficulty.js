var scramble = (function (game) {

    game.diff = {};

    game.diff.saveDiff = function() {
        localStorage.diff = game.diff.current;
    };

    game.diff.updateDiff = function() {
        if(document.querySelector('.active')) {
            var oldElement = document.querySelector('.active');
            oldElement.classList.remove('active');            
        }

        var element = document.querySelector('input[name=' + game.diff.current);
        element.checked = '';
        element.parentNode.classList.add('active');
    };

    return game;
}( scramble || {}));