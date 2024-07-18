document.addEventListener('DOMContentLoaded', function() {
    // URLs de los recursos
    const resources = {
        weeklyPlan: 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json',
        verbosBaseUrl: 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbs/'
    };

    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Obtener el día de la semana actual
    var today = new Date();
    var dayOfWeekIndex = today.getDay();
    var currentDay = daysOfWeek[dayOfWeekIndex];

    // Mostrar el día de la semana actual en el HTML
    document.getElementById('dayOfWeek').innerText = 'Day: ' + currentDay;

    // Función para realizar una solicitud XMLHttpRequest
    function makeRequest(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback('Error: ' + xhr.statusText);
                }
            }
        };
        xhr.send();
    }

    // Función para cargar y mostrar un verbo del JSON
    function loadVerbOfTheDay() {
        // Fetch del plan semanal usando XMLHttpRequest
        makeRequest('GET', resources.weeklyPlan, function(error, response) {
            if (error) {
                console.error('Error al cargar el archivo JSON del plan semanal:', error);
                document.getElementById('infinitive').innerText = 'Error al cargar el plan semanal';
                document.getElementById('tense-title').innerText = '';
                document.getElementById('conjugations').innerText = '';
                return;
            }

            var weeklyPlan = JSON.parse(response);
            // Obtener el verbo correspondiente al día de la semana actual
            var selectedVerb = weeklyPlan[currentDay];
            // Construir la URL del archivo JSON del verbo seleccionado
            var url = resources.verbosBaseUrl + selectedVerb + '.json';

            // Fetch del JSON del verbo seleccionado usando XMLHttpRequest
            makeRequest('GET', url, function(error, response) {
                if (error) {
                    console.error('Error al cargar el archivo JSON del verbo:', error);
                    document.getElementById('infinitive').innerText = 'Error al cargar los datos';
                    document.getElementById('tense-title').innerText = '';
                    document.getElementById('conjugations').innerText = '';
                    return;
                }

                var verbo = JSON.parse(response);
                var infinitiveText = verbo.infinitive;
                document.getElementById('infinitive').innerText = infinitiveText;

                // Función para mostrar pronombres y luego verbos conjugados
                function showConjugations(tense) {
                    document.getElementById('tense-title').innerText = tense.title;

                    // Mostrar pronombres primero
                    document.getElementById('conjugations').innerHTML = 
                        'I:<br>' +
                        'You:<br>' +
                        'He/She/It:<br>' +
                        'We:<br>' +
                        'They:<br>';

                    // Esperar 5 segundos antes de mostrar los verbos conjugados
                    setTimeout(function() {
                        document.getElementById('conjugations').innerHTML = 
                            'I: ' + tense.conjugations.I + '<br>' +
                            'You: ' + tense.conjugations.You + '<br>' +
                            'He/She/It: ' + tense.conjugations['He/She/It'] + '<br>' +
                            'We: ' + tense.conjugations.We + '<br>' +
                            'They: ' + tense.conjugations.They + '<br>';
                    }, 5000);
                }

                // Array de tiempos verbales a mostrar
                var tenses = [
                    { title: 'Present Simple', conjugations: verbo.conjugations.present },
                    { title: 'Past', conjugations: verbo.conjugations.past },
                    { title: 'Present Perfect', conjugations: verbo.conjugations.presentPerfect }
                ];

                var currentIndex = 0;

                // Función para cambiar entre tiempos verbales cada 10 segundos
                function displayTense() {
                    var tense = tenses[currentIndex];
                    showConjugations(tense);
                    currentIndex = (currentIndex + 1) % tenses.length;
                }

                // Iniciar la rotación de tiempos verbales
                displayTense();
                setInterval(displayTense, 10000);
            });
        });
    }

    // Cargar el verbo del día al cargar la página
    loadVerbOfTheDay();
});