<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" >
    <title>Scramble</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="style.css">
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script>
    if (document.querySelector && window.addEventListener) {
        document.documentElement.classList.add('js');
    }
</script>
<style>
    .js #warning { display: none; }
</style>
</head>
<body>
    <main class="container">
        <div class="modal fade" id="success-modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Success</h3>
                    </div>
                    <div class="modal-body">
                        <p>
                            That is correct
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div id="warning" class="alert alert-danger" role="alert">This program requires <strong>Javascript</strong> in order to run. Please enable Javascript within your browser's settings.</div>
        <div class="jumbotron">
            <h1>Scramble</h1>
            <p class="text-muted">A Zero Daedalus Game</p>
            <p>
            <div id="diffSelect" class="btn-group" data-toggle="buttons">
                <label class="btn btn-success">
                    <input type="radio" name="easy">Easy
                </label>
                <label class="btn btn-success">
                    <input type="radio" name="medium">Medium
                </label>
                <label class="btn btn-success">
                    <input type="radio" name="hard">Hard
                </label>
                <label class="btn btn-danger">
                    <input type="radio" name="stupid">Stupid
                </label>
            </div>
            </p>
            <p>
                <button id="highlightToggle" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Highlight Answers</button>
            </p>
            <span class="badge">Score: <span id="score"></span></span>
            <a href="" onclick="scramble.score.clear();return false;">Clear</a>
        </div>
        <form class="well" action="javascript:void(0);">
        <p><span class="label label-success">Score Multiplier: <span id="multiplier"></span></span></p>
            <div class="form-group">
                <input id="answer" type="text" class="form-control" placeholder="Type your answer here" autofocus>
            </div>
        </form>
    </main>
    <script src="script.js"></script>
    <script>

        console.log("Look here to cheat");
        // Load Game
        scramble.run();
    </script>
</body>
</html>
