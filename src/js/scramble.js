var scramble = (function( game ){
    var input = document.querySelector('#answer');
    var diffSelect = document.querySelector('#diffSelect');
    var modal = document.querySelector('#success-modal');

    var diffListener = function ( e ) {
         if (e.target !== e.currentTarget && e.target.type === 'radio') {
            if (['easy', 'medium', 'hard', 'stupid'].indexOf(e.target.name) > -1) {
                game.diff = e.target.name;
                game.saveDiff();
                game.destroy();
            }
        }
        e.stopPropagation();
        input.focus();
    };

    var answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === game.word.toLowerCase()) {
            $('#success-modal').modal();
            setTimeout(function() {
                $('#success-modal').modal('hide');
            }, 900);

            $('#success-modal').on('hidden.bs.modal', function (e) {
                input.focus();
            });
            game.addScore(game.diff);
            input.value = '';
            game.destroy();
        }
    };

    game.destroy = function() {
        window.scramble = null;
        window.scramble = game;
        diffSelect.removeEventListener('click', diffListener);
        input.removeEventListener('input', answerListener);
        window.scramble.run();
    };

    game.run = function( settings ) {
        if (localStorage.diff) {
            game.diff = localStorage.diff;
            game.updateDiff();
        } else {
            game.diff = 'easy';
            game.saveDiff();
            game.updateDiff();
        }

        game.redrawScore();
        game.setWord();
        input.addEventListener( 'input', answerListener);
        diffSelect.addEventListener( 'click', diffListener);
    };

    return game;
}(scramble || {}));