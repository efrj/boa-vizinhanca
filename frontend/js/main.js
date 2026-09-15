document.addEventListener('alpine:init', () => {
    Alpine.data('neighborhood', () => ({
        baseUrl: 'http://localhost',
        countdown: 7,
        timerProgress: 100,
        timerInterval: null,
        selectedCharacter: null,
        showModal: false,
        codeEditor: null,
        activeCodeInfo: { filename: '', language: '', code: '', mode: 'javascript' },
        copiedToast: false,

        characters: [
            { id: 1, name: 'Chaves', port: 8001, lang: 'PHP', avatar: '/img/chaves.png', langLogo: '/img/php.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'bg-primary' },
            { id: 2, name: 'Seu Madruga', port: 8021, lang: 'ASP', avatar: '/img/seu-madruga.png', langLogo: '/img/asp.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-seu-madruga' },
            { id: 3, name: 'Quico', port: 8003, lang: 'Node.js', avatar: '/img/quico.png', langLogo: '/img/nodejs.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-quico' },
            { id: 4, name: 'Chiquinha', port: 8004, lang: 'Python', avatar: '/img/chiquinha.png', langLogo: '/img/python.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-chiquinha' },
            { id: 5, name: 'Dona Florinda', port: 8008, lang: 'Java', avatar: '/img/dona-florinda.png', langLogo: '/img/java.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-dona-florinda' },
            { id: 6, name: 'Prof. Girafales', port: 8002, lang: 'Ruby', avatar: '/img/professor-girafales.png', langLogo: '/img/ruby.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-professor-girafales' },
            { id: 7, name: 'Seu Barriga', port: 8014, lang: 'C++', avatar: '/img/seu-barriga.png', langLogo: '/img/c++.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-seu-barriga' },
            { id: 8, name: 'Dona Clotilde', port: 8006, lang: 'Perl', avatar: '/img/dona-clotilde.png', langLogo: '/img/perl.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-dona-clotilde' },
            { id: 9, name: 'Nhonho', port: 8007, lang: 'Go', avatar: '/img/nhonho.png', langLogo: '/img/go.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-nhonho' },
            { id: 10, name: 'Godinez', port: 8009, lang: 'Swift', avatar: '/img/godinez.png', langLogo: '/img/swift.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-godinez' },
            { id: 11, name: 'Carteiro Jaiminho', port: 8010, lang: 'Clipper', avatar: '/img/jaiminho.png', langLogo: '/img/programming-languages/clipper.webp', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-jaiminho' },
            { id: 12, name: 'Dona Neves', port: 8005, lang: 'Lua', avatar: '/img/dona-neves.png', langLogo: '/img/lua.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-dona-neves' },
            { id: 13, name: 'Popis', port: 8013, lang: 'CoffeeScript', avatar: '/img/popis.png', langLogo: '/img/coffeescript.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-popis' },
            { id: 14, name: 'Paty', port: 8011, lang: 'Crystal', avatar: '/img/paty.png', langLogo: '/img/crystal.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-paty' },
            { id: 15, name: 'Chapolin Colorado', port: 8012, lang: 'TypeScript', avatar: '/img/chapolin-colorado.png', langLogo: '/img/typescript.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-chapolin-colorado' },
            { id: 16, name: 'Tripa Seca', port: 8017, lang: 'Haskell', avatar: '/img/tripa-seca.png', langLogo: '/img/haskell.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-tripa-seca' },
            { id: 17, name: 'Quase Nada', port: 8018, lang: 'OCaml', avatar: '/img/quase-nada.png', langLogo: '/img/ocaml.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-quase-nada' },
            { id: 18, name: 'Alma Negra', port: 8020, lang: 'Zig', avatar: '/img/alma-negra.png', langLogo: '/img/zig.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-alma-negra' },
            { id: 19, name: 'Super Sam', port: 8019, lang: 'Nim', avatar: '/img/super-sam.png', langLogo: '/img/nim.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-super-sam' },
            { id: 20, name: 'Racha Cuca', port: 8016, lang: 'Scala', avatar: '/img/racha-cuca.png', langLogo: '/img/scala.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-racha-cuca' },
            { id: 21, name: 'Dr. Chapatin', port: 8015, lang: 'Dart', avatar: '/img/dr-chapatin.png', langLogo: '/img/dart.png', phrase: 'Carregando...', loading: true, status: 'loading', style: 'card-theme-dr-chapatin' }
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
                console.warn('Using default URL http://localhost:', error);
            }
        },

        async fetchPhrase(character) {
            character.loading = true;
            character.status = 'loading';
            try {
                // If using HTTPS (production), use the secure route /api/PORT/
                // If using local HTTP, use http://localhost:PORT/
                let targetUrl;
                if (window.location.protocol === 'https:' || this.baseUrl.startsWith('/')) {
                    targetUrl = `/api/${character.port}/`;
                } else {
                    targetUrl = `${this.baseUrl}:${character.port}/`;
                }

                const response = await fetch(targetUrl);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const text = await response.text();
                character.phrase = text.trim();
                character.status = 'online';
            } catch (error) {
                console.error(`Error loading phrase for ${character.name}:`, error);
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
            this.copiedToast = false;

            const codeData = (window.characterBackendCodes && window.characterBackendCodes[character.id]) || {
                filename: 'backend_code',
                language: character.lang,
                mode: 'javascript',
                prismLang: 'javascript',
                code: '// Source code not available'
            };

            this.activeCodeInfo = codeData;

            this.$nextTick(() => {
                const codeElem = document.getElementById('code-viewer-element');
                if (codeElem && window.Prism) {
                    codeElem.textContent = codeData.code;
                    codeElem.className = `language-${codeData.prismLang || codeData.mode}`;
                    Prism.highlightElement(codeElem);
                }
            });
        },

        closeCharacterModal() {
            this.showModal = false;
        },

        copyBackendCode() {
            if (!this.activeCodeInfo || !this.activeCodeInfo.code) return;

            navigator.clipboard.writeText(this.activeCodeInfo.code).then(() => {
                this.copiedToast = true;
                setTimeout(() => {
                    this.copiedToast = false;
                }, 2000);
            }).catch(err => {
                console.error('Error copying code:', err);
            });
        }
    }));
});