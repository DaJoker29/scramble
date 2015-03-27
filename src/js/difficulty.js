var Scramble = (function (game) {

    game.Difficulty = {};

    game.Difficulty.saveDifficulty = function() {
        localStorage.Difficulty = game.Difficulty.current;
    };

    game.Difficulty.updateDifficulty = function() {
        if(document.querySelector('.active')) {
            var oldElement = document.querySelector('.active');
            oldElement.classList.remove('active');            
        }

        var element = document.querySelector('input[name=' + game.Difficulty.current);
        element.checked = '';
        element.parentNode.classList.add('active');
    };

    return game;
}( Scramble || {}));