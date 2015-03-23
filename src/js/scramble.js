var scramble = (function(){
    var game = {};
    var input = document.querySelector('#answer');
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
            var index = Math.floor(Math.random() * (result.words.length));

            word = result.words[index];
            drawWord();
        });
    };

    var drawWord = function() {
        var element;
        var scrambled = word.shuffle();
        console.log(word);

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

    game.addScore = function ( pts ) {
        localStorage.score = parseInt(localStorage.score) + pts;
    };

    game.destroy = function() {
        window.scramble = null;
        window.scramble = game;
        window.scramble.run();
    };

    game.run = function() {
        game.redrawScore();
        setWord();
        input.addEventListener( 'input', function(e) {
            if(e.target.value.toLowerCase() === word.toLowerCase()) {
                alert('You won!');
                game.addScore(5);
                input.value = '';
                game.destroy();
            }
        });
    };

    return game;
}());