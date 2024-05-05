$(document).ready(function() {
    const jsonFilePath = '../config.json';
    let url_app;

    async function getConfig() {
        try {
            const response = await fetch(jsonFilePath);
            const data = await response.json();
            
            url_app = data.url;

            console.log('URL:', url_app);

            updatePhrases();
        } catch (error) {
            console.error('Erro ao obter o arquivo JSON:', error);
        }
    }

    getConfig();

    function loadPhrase(url, element) {
        $.get(url)
        .done(function(phrase) {
            let targetElement = $("#" + element);
            if (targetElement.length) {
                targetElement.text(phrase);
            }
        })
        .fail(function(error) {
            console.log(error);
        });
    }

    function updatePhrases() {
        loadPhrase(`${url_app}:8001/`, "person1");
        loadPhrase(`${url_app}:8004/`, "person2");
        loadPhrase(`${url_app}:8005/`, "person3");
        loadPhrase(`${url_app}:8002/`, "person4");
        loadPhrase(`${url_app}:8003/`, "person5");
        loadPhrase(`${url_app}:8006/`, "person6");
        loadPhrase(`${url_app}:8007/`, "person7");
        loadPhrase(`${url_app}:8008/`, "person8");
        loadPhrase(`${url_app}:8009/`, "person9");
        loadPhrase(`${url_app}:8010/`, "person10");
        loadPhrase(`${url_app}:8011/`, "person11");
        loadPhrase(`${url_app}:8012/`, "person12");
        loadPhrase(`${url_app}:8013/`, "person13");

        // Update of Doctor Chapatin's phrases
        $.getJSON( "phrases/phrases.json", function( data ) {
            const randomNumber = Math.floor(Math.random() * data.doutor_chapatin.length);
            const drChapatinPhrase = data.doutor_chapatin[randomNumber];
            $('#person14').html(drChapatinPhrase);
        });
    }

    let countdown = 7;

    function updateMessage() {
        let messageElement = $("#alertMessage");
        if (messageElement.length) {
            messageElement.text(`Novas frases serão exibidas em ${countdown} segundos.`);
        }

        countdown--;

        if (countdown < 0) {
            countdown = 7;
            updatePhrases();
        }
    }

    updateMessage();

    setInterval(function() {
        updateMessage();
    }, 1000);
});