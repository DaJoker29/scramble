var scramble = (function (game) {

    game.saveDiff = function() {
        localStorage.diff = game.diff;
    };

    game.updateDiff = function() {
        if(document.querySelector('.active')) {
            var oldElement = document.querySelector('.active');
            oldElement.classList.remove('active');            
        }

        var element = document.querySelector('input[name=' + game.diff);
        element.checked = '';
        element.parentNode.classList.add('active');
    };

    return game;
}( scramble || {}));