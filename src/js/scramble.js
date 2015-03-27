var Scramble = (function( game ){
    var input = document.querySelector('#answer');
    var DifficultySelect = document.querySelector('#DifficultySelect');
    var modal = document.querySelector('#success-modal');
    var highlight = document.querySelector('form');
    var highlightToggle = document.querySelector('#highlight-toggle');

    var _toggleListener = function() {
        game.Highlight.toggle();
    };

    var _difficultyListener = function ( e ) {
         if (e.target !== e.currentTarget && e.target.type === 'radio') {
            if (['easy', 'medium', 'hard', 'stupid'].indexOf(e.target.name) > -1) {
                game.Difficulty.current = e.target.name;
                game.Difficulty.saveDifficulty();
                game.destroy();
            }
        }
        e.stopPropagation();
        input.focus();
    };

    var _highlightListener = function( e ) {
        if(localStorage.Highlight === 'on') {
            if(e.target.value.length === 0)
            {
                highlight.style.backgroundColor = '';
            } else if (game.Word.current.toLowerCase().lastIndexOf(e.target.value.toLowerCase(), 0) === 0) {
                highlight.style.backgroundColor = 'limegreen';
            } else{
                highlight.style.backgroundColor = 'tomato';
            }
        }
    };

    var _answerListener = function ( e ) {
        if(e.target.value.toLowerCase() === game.Word.current.toLowerCase()) {
            $('#correctLabel').toggleClass('invisible');
            setTimeout(function() {
                $('#correctLabel').toggleClass('invisible');
            }, 1200);

            game.Score.add(game.Difficulty.current);
            input.value = '';
            game.destroy();
        }
    };

    game.destroy = function() {
        game.Multiplier.stop();        
        window.Scramble = game;
        DifficultySelect.removeEventListener('click', _difficultyListener);
        input.removeEventListener('input', _answerListener);
        input.removeEventListener('input', _highlightListener);
        highlightToggle.removeEventListener( 'click', _toggleListener);
        highlight.style.backgroundColor = '';
        window.Scramble.run();
    };

    game.run = function( settings ) {
        if (localStorage.Difficulty) {
            game.Difficulty.current = localStorage.Difficulty;
            game.Difficulty.updateDifficulty();
        } else {
            game.Difficulty.current = 'easy';
            game.Difficulty.saveDifficulty();
            game.Difficulty.updateDifficulty();
        }

        if(localStorage.Highlight === 'on') {
            var toggle = document.querySelector('#highlight-toggle');
            toggle.setAttribute('aria-pressed', true);
            toggle.classList.add('active');
        }

        game.Score.update();
        game.Word.set();
        input.addEventListener( 'input', _answerListener);
        input.addEventListener( 'input', _highlightListener);
        DifficultySelect.addEventListener( 'click', _difficultyListener);
        highlightToggle.addEventListener( 'click', _toggleListener);
        game.Multiplier.start();
    };

    return game;
}(Scramble || {}));