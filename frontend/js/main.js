document.addEventListener('alpine:init', () => {
    Alpine.data('neighborhood', () => ({
        baseUrl: 'http://localhost',
        countdown: 7,
        timerProgress: 100,
        timerInterval: null,
        selectedCharacter: null,
        showModal: false,
        characters: [
            { id: 1, name: 'Chaves', port: 8001, lang: 'PHP', avatar: '/img/chaves.png', langLogo: '/img/php.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-green' },
            { id: 2, name: 'Dona Florinda', port: 8004, lang: 'Python', avatar: '/img/dona-florinda.png', langLogo: '/img/python.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-orange' },
            { id: 3, name: 'Seu Madruga', port: 8005, lang: 'Lua', avatar: '/img/seu-madruga.png', langLogo: '/img/lua.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-blue' },
            { id: 4, name: 'Prof. Girafales', port: 8002, lang: 'Ruby', avatar: '/img/professor-girafales.png', langLogo: '/img/ruby.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-yellow' },
            { id: 5, name: 'Quico', port: 8003, lang: 'Node.js', avatar: '/img/quico.png', langLogo: '/img/nodejs.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-blue' },
            { id: 6, name: 'Chiquinha', port: 8006, lang: 'Perl', avatar: '/img/chiquinha.png', langLogo: '/img/perl.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-green' },
            { id: 7, name: 'Nhonho', port: 8007, lang: 'Go', avatar: '/img/nhonho.png', langLogo: '/img/go.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-orange' },
            { id: 8, name: 'Seu Barriga', port: 8008, lang: 'Java', avatar: '/img/seu-barriga.png', langLogo: '/img/java.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-yellow' },
            { id: 9, name: 'Dona Clotilde', port: 8009, lang: 'Swift', avatar: '/img/dona-clotilde.png', langLogo: '/img/swift.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-blue' },
            { id: 10, name: 'Carteiro Jaiminho', port: 8010, lang: 'Shell Script', avatar: '/img/jaiminho.png', langLogo: '/img/sh.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-orange' },
            { id: 11, name: 'Popis', port: 8011, lang: 'Crystal', avatar: '/img/popis.png', langLogo: '/img/crystal.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-red' },
            { id: 12, name: 'Godinez', port: 8012, lang: 'TypeScript', avatar: '/img/godinez.png', langLogo: '/img/typescript.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-green' },
            { id: 13, name: 'Paty', port: 8013, lang: 'CoffeeScript', avatar: '/img/paty.png', langLogo: '/img/coffeescript.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-blue' },
            { id: 14, name: 'Dr. Chapatin', port: 8014, lang: 'C++', avatar: '/img/dr-chapatin.png', langLogo: '/img/c++.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-red' },
            { id: 15, name: 'Chapolin Colorado', port: 8015, lang: 'Dart', avatar: '/img/chapolin-colorado.png', langLogo: '/img/dart.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'style-red' }
        ],

        async init() {
            await this.loadConfig();
            await this.updateAllPhrases();
            this.startTimer();
        },

        async loadConfig() {
            try {
                const response = await fetch('/config.json');
                const data = await response.json();
                if (data && data.url) {
                    this.baseUrl = data.url;
                }
            } catch (error) {
                console.warn('Usando URL padrão http://localhost:', error);
            }
        },

        async fetchPhrase(character) {
            character.loading = true;
            character.status = 'loading';
            try {
                const targetUrl = `${this.baseUrl}:${character.port}/`;
                const response = await fetch(targetUrl);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const text = await response.text();
                character.phrase = text.trim();
                character.status = 'online';
            } catch (error) {
                console.error(`Erro ao carregar frase para ${character.name}:`, error);
                character.phrase = 'Não foi possível carregar a frase neste momento.';
                character.status = 'error';
            } finally {
                character.loading = false;
            }
        },

        updateAllPhrases() {
            return Promise.all(this.characters.map(char => this.fetchPhrase(char)));
        },

        startTimer() {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.countdown = 7;
            this.timerProgress = 100;

            this.timerInterval = setInterval(() => {
                this.countdown--;
                this.timerProgress = (this.countdown / 7) * 100;

                if (this.countdown <= 0) {
                    this.countdown = 7;
                    this.timerProgress = 100;
                    this.updateAllPhrases();
                }
            }, 1000);
        },

        openCharacterModal(character) {
            this.selectedCharacter = character;
            this.showModal = true;
        },

        closeCharacterModal() {
            this.showModal = false;
        }
    }));
});