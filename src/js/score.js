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

    game.score.add = function ( diff ) {
        var pts;
        switch(diff) {
            case 'easy': 
                pts = 5;
                break;
            case 'medium':
                pts = 10;
                break;
            case 'hard':
                pts = 15;
                break;
            case 'stupid':
                pts = 25;
                break;
            default: 
                pts = 0;
        }

        localStorage.score = parseInt(localStorage.score) + pts;
    };

    return game;
}(scramble || {}));