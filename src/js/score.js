var scramble = (function (game) {
    
    game.score = {};

    var scoreEl = document.querySelector('#score');

    game.score.update = function() {
        scoreEl.textContent = localStorage.score = localStorage.score || 0;
    };

    game.score.clear = function() {
        localStorage.score = 0;
        game.score.update();
    };

    game.score.add = function ( input ) {
        if(typeof(input) === 'number') {
            pts = input;
        } else {
            switch(input) {
                case 'easy': 
                    pts = 10;
                    break;
                case 'medium':
                    pts = 15;
                    break;
                case 'hard':
                    pts = 25;
                    break;
                case 'stupid':
                    pts = 50;
                    break;
                default: 
                    pts = 0;
            }
            if(game.highlight.current === 'on') {
                pts = Math.floor(pts / 2);
            }
        }

        localStorage.score = parseInt(localStorage.score) + pts;
        game.score.update();
    };

    return game;
}(scramble || {}));