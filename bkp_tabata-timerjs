document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la fecha y hora actual en el elemento con id "datetime"
    function updateDateTime() {
        var now = new Date();
        var formattedDateTime = now.toLocaleString();
        document.getElementById('datetime').innerText = formattedDateTime;
    }
    setInterval(updateDateTime, 1000); // Actualizar cada segundo

    var timer;
    var timeRemaining = 0;

    function updateTimeDisplay() {
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = timeRemaining % 60;
        document.getElementById('time').innerText = 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(function() {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimeDisplay();
            } else {
                clearInterval(timer);
                document.getElementById('time').innerText = "00:00";
                alert('Time\'s up!');
            }
        }, 1000);
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        timeRemaining = 0;
        updateTimeDisplay();
    }

    function setTime(seconds) {
        timeRemaining = seconds;
        updateTimeDisplay();
        startTimer(); // Start the timer automatically after setting the time
    }

    document.getElementById('reset').addEventListener('click', resetTimer);

    document.getElementById('btn-5sec').addEventListener('click', function() { setTime(5); });
    document.getElementById('btn-10min').addEventListener('click', function() { setTime(600); });
    document.getElementById('btn-15min').addEventListener('click', function() { setTime(900); });
    document.getElementById('btn-30min').addEventListener('click', function() { setTime(1800); });
    document.getElementById('btn-1hr').addEventListener('click', function() { setTime(3600); });
});
