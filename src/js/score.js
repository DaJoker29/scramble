var scramble = (function (game) {
    var score = document.querySelector('#score');

    game.redrawScore = function() {
        score.textContent = localStorage.score = localStorage.score || 0;
    };

    game.clearScore = function() {
        localStorage.score = 0;
        game.redrawScore();
    };

    game.addScore = function ( diff ) {
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