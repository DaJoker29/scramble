var Scramble = (function ( game ) {
    
    game.Highlight = {};
    game.Highlight.current = localStorage.Highlight = localStorage.Highlight || 'off';

    game.Highlight.toggle = function() {
        if(game.Highlight.current === 'off') {
            game.Highlight.current = localStorage.Highlight = 'on';
        } else {
            game.Highlight.current = localStorage.Highlight = 'off';
            var el = document.querySelector('form');
            el.style.backgroundColor = '';
            game.destroy();
        }
    };

    return game;
}( Scramble || {}));