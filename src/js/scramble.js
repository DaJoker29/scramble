var scramble = (function( game ){
    var input = document.querySelector('#answer');
    var diffSelect = document.querySelector('#diffSelect');
    var modal = document.querySelector('#success-modal');

    var diffListener = function ( e ) {
         if (e.target !== e.currentTarget && e.target.type === 'radio') {
            if (['easy', 'medium', 'hard', 'stupid'].indexOf(e.target.name) > -1) {
                game.diff.current = e.target.name;
                game.diff.saveDiff();
                game.destroy();
            }
        }
        e.stopPropagation();
        input.focus();
    };

    var answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === game.word.current.toLowerCase()) {
            $('#success-modal').modal();
            setTimeout(function() {
                $('#success-modal').modal('hide');
            }, 900);

            $('#success-modal').on('hidden.bs.modal', function (e) {
                input.focus();
            });
            game.score.add(game.diff.current);
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
            game.diff.current = localStorage.diff;
            game.diff.updateDiff();
        } else {
            game.diff.current = 'easy';
            game.diff.saveDiff();
            game.diff.updateDiff();
        }

        game.score.update();
        game.word.set();
        input.addEventListener( 'input', answerListener);
        diffSelect.addEventListener( 'click', diffListener);
    };

    return game;
}(scramble || {}));