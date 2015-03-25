var scramble = (function ( game ) {

    var el = document.querySelector('#highlightToggle');

    game.highlight = {};
    game.highlight.current = localStorage.highlight = localStorage.highlight || 'off';

    game.highlight.toggle = function() {
        if(game.highlight.current === 'off') {
            game.highlight.current = localStorage.highlight = 'on';
        } else {
            game.highlight.current = localStorage.highlight = 'off';
            var el = document.querySelector('form');
            el.style.backgroundColor = '';
        }
    };

    return game;
}( scramble || {}));