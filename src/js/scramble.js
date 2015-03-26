var scramble = (function( game ){
    var input = document.querySelector('#answer');
    var diffSelect = document.querySelector('#diffSelect');
    var modal = document.querySelector('#success-modal');
    var highlight = document.querySelector('form');
    var highlightToggle = document.querySelector('#highlightToggle');

    var toggleListener = function() {
        game.highlight.toggle();
    };

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

    var highlightListener = function( e ) {
        if(localStorage.highlight === 'on') {
            if(e.target.value.length === 0)
            {
                highlight.style.backgroundColor = '';
            } else if (game.word.current.toLowerCase().lastIndexOf(e.target.value.toLowerCase(), 0) === 0) {
                highlight.style.backgroundColor = 'limegreen';
            } else{
                highlight.style.backgroundColor = 'tomato';
            }
        }
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
        game.multiplier.stop();        
        window.scramble = game;
        diffSelect.removeEventListener('click', diffListener);
        input.removeEventListener('input', answerListener);
        input.removeEventListener('input', highlightListener);
        highlightToggle.removeEventListener( 'click', toggleListener);
        highlight.style.backgroundColor = '';
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

        if(localStorage.highlight === 'on') {
            var toggle = document.querySelector('#highlightToggle');
            toggle.setAttribute('aria-pressed', true);
            toggle.classList.add('active');
        }

        game.score.update();
        game.word.set();
        input.addEventListener( 'input', answerListener);
        input.addEventListener( 'input', highlightListener);
        diffSelect.addEventListener( 'click', diffListener);
        highlightToggle.addEventListener( 'click', toggleListener);
        game.multiplier.start();
    };

    return game;
}(scramble || {}));