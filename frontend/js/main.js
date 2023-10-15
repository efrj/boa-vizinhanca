document.addEventListener("DOMContentLoaded", function() {
    function loadPhrase(url, element) {
        axios.get(url).then(function(response) {
            let phrase = response.data;
            let targetElement = document.getElementById(element);

            if (targetElement) {
                targetElement.innerText = phrase;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    function updatePhrases() {
        loadPhrase("http://localhost:8001/", "person1");
        loadPhrase("http://localhost:8002/", "person2");
        loadPhrase("http://localhost:8003/", "person3");
        loadPhrase("http://localhost:8004/", "person4");
        loadPhrase("http://localhost:8005/", "person5");
        loadPhrase("http://localhost:8006/", "person6");
        loadPhrase("http://localhost:8007/", "person7");
        loadPhrase("http://localhost:8008/", "person8");
        loadPhrase("http://localhost:8009/", "person9");
        loadPhrase("http://localhost:8010/", "person10");
    }

    let countdown = 7;

    function updateMessage() {
        let messageElement = document.getElementById("alertMessage");
        if (messageElement) {
            messageElement.innerText = `Novas frases serão exibidas em ${countdown} segundos.`;
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

    updatePhrases()
});