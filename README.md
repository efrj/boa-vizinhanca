# A Boa Vizinhança

![alt](screenshot.gif) 

Página web totalmente nonsense feita para mostrar frases aletórias dos personagens da série Chaves oriundas de aplicações simples desenvolvidas em diferentes linguagens de programação. 

Cada personagem do seriado "Chaves" exibe uma frase retornada de uma aplicação web desenvolvida com uma linguagem dinstinta. 

## Personagem/Linguagem de Programação/URL

| Personagem          | Linguagem de Programação |    URL                |
| :---                |            :---:         |    :---:              |
| Chaves              | PHP                      | http://localhost:8001 |
| Professor Girafales | Ruby                     | http://localhost:8002 |
| Quico               | Node.JS                  | http://localhost:8003 |
| Dona Florinda       | Python                   | http://localhost:8004 |
| Seu Madruga         | Lua                      | http://localhost:8005 |
| Chiquinha           | Perl                     | http://localhost:8006 |
| Nhonho              | Go                       | http://localhost:8007 |
| Seu Barriga         | Java                     | http://localhost:8008 |
| Dona Clotilde       | Swift                    | http://localhost:8009 |
| Carteiro Jaiminho   | Shell Script             | http://localhost:8010 |
| Popis               | Crystal                  | http://localhost:8011 |
| Godinez             | TypeScript               | http://localhost:8012 | 
| Paty                | CofeeScript              | http://localhost:8013 | 
| Doutor Chapatin     | C++                      | http://localhost:8014 | 

Para rodar o projeto use o comando "docker-compose up". Visualize a página na url "http://localhost:8000/". 

### Atenção! 
O tempo para download das imagens e montagem dos containers pode variar de 5 a 15 minutos. Se o modelo do seu processador for muito defasado e a quantidade de memória RAM for baixa esse tempo pode passar dos 20 minutos. 

Caso você queira mudar o IP, entre no diretório 'frontend' e altere o arquivo 'config.json' mudando a chave 'url'. 
A url padrão é http://localhost. 

#### URL padrão

```json
{
    "url": "http://localhost"
}
``` 

#### URL alterada

```json
{
    "url": "http://192.168.10.0.1"
}
``` 

Altere apenas o IP, sem acrescentar a porta. A página será acessada sempre na porta '8000'

## Colaborações e sugestões serão bem-vindas! 
