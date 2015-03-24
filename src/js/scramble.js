var scramble = (function(){
    var game = {};
    var input = document.querySelector('#answer');
    var diffSelect = document.querySelector('#diffSelect');
    var modal = document.querySelector('#success-modal');
    var word = '';

    String.prototype.shuffle = function() {
        var a = this.split('');
        var n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join('');
    };

    var getJSON = function(callback) {
        var request = new XMLHttpRequest();
        request.open('GET', 'words.json', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            }
        };

        request.send();
    };

    var setWord = function() {
        getJSON(function(response) {
            result = JSON.parse(response);
            var index = Math.floor(Math.random() * (result[game.diff].length));

            word = result[game.diff][index];
            drawWord();
        });
    };

    var drawWord = function() {
        var element;
        var scrambled = word.shuffle();
        console.log(word); // For cheating

        if(document.querySelector('#scrambled')) {
            element = document.querySelector('#scrambled');
            element.innerHTML = 'The word to unscramble is: <mark><strong>' + scrambled.toUpperCase() + '</strong></mark>';
        } else {
            var page = document.querySelector('main');
            element = document.createElement('h3');
            element.id = 'scrambled';
            element.classList.add('well');
            element.innerHTML = 'The word to unscramble is: <mark><strong>' + scrambled.toUpperCase() + '</strong></mark>';
            page.appendChild(element);
        }
    };

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
        if(e.target.value.toLowerCase() === word.toLowerCase()) {
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

    game.redrawScore = function() {
        if (!localStorage.score) {
            localStorage.score = 0;
        }
        score.textContent = localStorage.score;
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

    game.destroy = function() {
        window.scramble = null;
        window.scramble = game;
        diffSelect.removeEventListener('click', diffListener);
        window.scramble.run();
    };

    game.saveDiff = function() {
        localStorage.diff = game.diff;
    };

    game.updateDiff = function() {
        if(document.querySelector('.active')) {
            var oldElement = document.querySelector('.active');
            oldElement.classList.remove('active');            
        }

        var element = document.querySelector('input[name=' + game.diff);
        element.checked = '';
        element.parentNode.classList.add('active');
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
        setWord();
        input.addEventListener( 'input', answerListener);

        diffSelect.addEventListener( 'click', diffListener);
    };

    return game;
}());