document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la fecha y hora actual en el elemento con id "datetime"
    function updateDateTime() {
        var now = new Date();
        // Opciones para formato británico
        var optionsDate = {
            weekday: 'long',  // Nombre completo del día
            day: 'numeric',   // Día del mes
            month: 'long',    // Nombre completo del mes
            year: 'numeric'   // Año completo
        };
        var optionsTime = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false     // Formato de 24 horas
        };

        // Obtener fecha y hora en formato británico
        var formattedDate = now.toLocaleDateString('en-GB', optionsDate);
        var formattedTime = now.toLocaleTimeString('en-GB', optionsTime);

        // Combinar fecha y hora en una sola cadena
        var formattedDateTime = `${formattedDate} ${formattedTime}`;
        document.getElementById('datetime').innerText = formattedDateTime;
    }
    setInterval(updateDateTime, 1000); // Actualizar cada segundo

    var timer;
    var timeRemaining = 0;

    var alarm = new Audio('alarm.mp3'); // Cargar el archivo de audio

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
                // Intenta reproducir el sonido de la alarma
                if (alarm) {
                    alarm.play().catch(function(error) {
                        console.log('Audio playback failed: ' + error);
                    });
                }
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
        startTimer(); // Iniciar el temporizador automáticamente después de establecer el tiempo
    }

    document.getElementById('reset').addEventListener('click', resetTimer);

    document.getElementById('btn-5sec').addEventListener('click', function() { setTime(5); });
    document.getElementById('btn-10min').addEventListener('click', function() { setTime(600); });
    document.getElementById('btn-15min').addEventListener('click', function() { setTime(900); });
    document.getElementById('btn-30min').addEventListener('click', function() { setTime(1800); });
    document.getElementById('btn-1hr').addEventListener('click', function() { setTime(3600); });
});
