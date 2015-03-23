var scramble = (function(){
    var game = {};
    var score = document.querySelector('#score');
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


    var redrawScore = function() {
        score.textContent = score.dataset.score;
    };

    var saveScore = function() {
        localStorage.setItem('score', score.dataset.score);
        redrawScore();
    };

    var getScore = function() {
        score.dataset.score = localStorage.score || 0;
    };

    var addScore = function ( points ) {
        score.dataset.score =  parseInt(score.dataset.score) + points;
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

    game.destroy = function() {
        window.scramble = null;
        window.scramble = game;
        window.scramble.run();
    };

    game.run = function() {
        getScore();
        redrawScore();
        setWord();
        input.addEventListener( 'input', function(e) {
            if(e.target.value === word) {
                alert('You won!');
                addScore(5);
                saveScore();
                input.value = '';
                game.destroy();
            }
        });
    };

    return game;
}());