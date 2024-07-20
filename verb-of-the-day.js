document.addEventListener('DOMContentLoaded', function() {
    var resources = {
        weeklyPlan: 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json',
        verbosBaseUrl: 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbs/'
    };

    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var today = new Date();
    var dayOfWeekIndex = today.getDay();
    var currentDay = daysOfWeek[dayOfWeekIndex];

    function makeRequest(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback('Error: ' + xhr.status + ' ' + xhr.statusText);
                }
            }
        };
        xhr.onerror = function() {
            callback('Network error');
        };
        xhr.send();
    }

    function loadVerbOfTheDay() {
        console.log('Fetching weekly plan from', resources.weeklyPlan);
        makeRequest('GET', resources.weeklyPlan, function(error, response) {
            if (error) {
                console.error('Error al cargar el archivo JSON del plan semanal:', error);
                document.getElementById('infinitive').innerText = 'Error al cargar el plan semanal';
                document.getElementById('tense-title').innerText = '';
                document.getElementById('conjugations').innerText = '';
                return;
            }

            console.log('Weekly plan response:', response);
            var weeklyPlan;
            try {
                weeklyPlan = JSON.parse(response);
            } catch (e) {
                console.error('Error parsing weekly plan JSON:', e);
                document.getElementById('infinitive').innerText = 'Error al parsear el plan semanal';
                document.getElementById('tense-title').innerText = '';
                document.getElementById('conjugations').innerText = '';
                return;
            }
            console.log('Parsed weekly plan:', weeklyPlan);

            var selectedVerb = weeklyPlan[currentDay];
            console.log('Selected verb for', currentDay, ':', selectedVerb);

            var url = resources.verbosBaseUrl + selectedVerb + '.json';
            console.log('Fetching verb JSON from', url);

            makeRequest('GET', url, function(error, response) {
                if (error) {
                    console.error('Error al cargar el archivo JSON del verbo:', error);
                    document.getElementById('infinitive').innerText = 'Error al cargar los datos';
                    document.getElementById('tense-title').innerText = '';
                    document.getElementById('conjugations').innerText = '';
                    return;
                }

                console.log('Verb JSON response:', response);
                var verbo;
                try {
                    verbo = JSON.parse(response);
                } catch (e) {
                    console.error('Error parsing verb JSON:', e);
                    document.getElementById('infinitive').innerText = 'Error al parsear los datos';
                    document.getElementById('tense-title').innerText = '';
                    document.getElementById('conjugations').innerText = '';
                    return;
                }
                console.log('Parsed verb:', verbo);

                var infinitiveText = verbo.infinitive;
                document.getElementById('infinitive').innerText = infinitiveText;

                function showConjugations(tense) {
                    document.getElementById('tense-title').innerText = tense.title;

                    document.getElementById('conjugations').innerHTML =
                        'I:<br>' +
                        'You:<br>' +
                        'He/She/It:<br>' +
                        'We:<br>' +
                        'They:<br>';

                    setTimeout(function() {
                        document.getElementById('conjugations').innerHTML =
                            'I: ' + tense.conjugations.I + '<br>' +
                            'You: ' + tense.conjugations.You + '<br>' +
                            'He/She/It: ' + tense.conjugations['He/She/It'] + '<br>' +
                            'We: ' + tense.conjugations.We + '<br>' +
                            'They: ' + tense.conjugations.They + '<br>';
                    }, 5000);
                }

                var tenses = [
                    { title: 'Present Simple', conjugations: verbo.conjugations.present },
                    { title: 'Past', conjugations: verbo.conjugations.past },
                    { title: 'Present Perfect', conjugations: verbo.conjugations.presentPerfect }
                ];

                var currentIndex = 0;

                function displayTense() {
                    var tense = tenses[currentIndex];
                    showConjugations(tense);
                    currentIndex = (currentIndex + 1) % tenses.length;
                }

                displayTense();
                setInterval(displayTense, 10000);
            });
        });
    }

    loadVerbOfTheDay();
});
