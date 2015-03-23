<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" >
    <title>Scramble</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>
    <main class="container">
        <div id="warning" class="alert alert-danger" role="alert">This program requires <strong>Javascript</strong> in order to run. Please enable Javascript within your browser's settings.</div>
        <div class="jumbotron">
            <h1>Scramble</h1>
            <p class="text-muted">A Zero Daedalus Game</p>
            <p>
                Score <span id="score" class="badge"></span>
            </p>
        </div>
        <form class="well" action="javascript:void(0);">
            <div class="form-group">
                <input id="answer" type="text" class="form-control" placeholder="Type your answer here">
            </div>
        </form>
    </main>
    <script src="script.js"></script>
    <script>
        // Javascript Warning
        if (document.querySelector && window.addEventListener) {
            var warning = document.querySelector('#warning');
            warning.style.display = 'none';
        }

        // Load Game
        scramble.run();
    </script>
</body>
</html>
