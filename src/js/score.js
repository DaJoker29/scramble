var Scramble = (function (game) {
    
    game.Score = {};

    var ScoreEl = document.querySelector('#Score');

    game.Score.update = function() {
        ScoreEl.textContent = localStorage.Score = localStorage.Score || 0;
    };

    game.Score.clear = function() {
        localStorage.Score = 0;
        game.Score.update();
    };

    game.Score.add = function ( input ) {
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
            if(game.Highlight.current === 'on') {
                pts = Math.floor(pts / 2);
            }
        }

        var Multiplier = game.Multiplier.current.toFixed(1);
        var newScore = pts * Multiplier;
        localStorage.Score = parseInt(localStorage.Score) + Math.floor(newScore);
        game.Score.update();
    };

    return game;
}(Scramble || {}));