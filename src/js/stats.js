var scramble = (function ( game ) {

    var stats = game.stats = {};
    var current;

    // Pull in stored statistics, if present
    stats.init = function () {
        current = {
            'gamesPlayed': localStorage.gamesPlayed || 0,
            'highScore': localStorage.highScore || 0,
            'totalScore': localStorage.totalScore || 0,
            'lastScore': localStorage.lastScore || 0,
            'powerupsUsed': localStorage.powerupsUsed || JSON.stringify({ 'skip': 0, 'reshuffle': 0, 'extraTime': 0 }),
            'favPowerup': localStorage.favPowerup || 'None',
            'longestWord': localStorage.longestWord || 'N/A'
        };
    };

    // Save current data
    stats.save = function () {
        for (var stat in current) {
            if( current.hasOwnProperty( stat ) ) {
                localStorage[stat] = current[stat];
            }
        }
    };

    // Clear saved data
    stats.clear = function() {
        for( var stat in current ) {
            if (current.hasOwnProperty ( stat ) ) {
                localStorage.removeItem(stat);
            }
        }
    };

    // Update the current statistics (all or a single field)
    stats.set = function( target, value ) {

        if (value && current.hasOwnProperty(target)) {
            current[target] = value;
        } else if (value && !current.hasOwnProperty(target) ) {
            return;
        } else {
            current = target;
        }
    };

    // Pull an object holding current statistics data
    stats.get = function( target ) {
        if (target ) {
            return current[target];
        } else {
            return current;
        }

    };

    return game;
} ( scramble || {}));