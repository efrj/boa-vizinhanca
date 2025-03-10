# A Boa Vizinhança

![alt](frontend/img/screenshot.gif) 

Página web totalmente nonsense feita para mostrar frases aletórias dos personagens da série Chaves oriundas de aplicações simples desenvolvidas em diferentes linguagens de programação. 

Cada personagem do seriado "Chaves" exibe uma frase retornada de uma aplicação web desenvolvida com uma linguagem dinstinta. 

## Personagem/Linguagem de Programação/URL

| Personagem                                                                              | Linguagem de Programação                                                 | URL                   |
| :---:                                                                                   | :---:                                                                    | :---:                 |
| <img src="frontend/img/chaves.png" alt="Chaves" height="100">                           | <img src="frontend/img/php.png" alt="PHP" height="50">                   | http://localhost:8001 |
| <img src="frontend/img/professor-girafales.png" alt="Professor Girafales" height="100"> | <img src="frontend/img/ruby.png" alt="Ruby" height="50">                 | http://localhost:8002 |
| <img src="frontend/img/quico.png" alt="Quico" height="100">                             | <img src="frontend/img/nodejs.png" alt="Node.JS" height="50">            | http://localhost:8003 |
| <img src="frontend/img/dona-florinda.png" alt="Dona Florinda" height="100">             | <img src="frontend/img/python.png" alt="Python" height="50">             | http://localhost:8004 |
| <img src="frontend/img/seu-madruga.png" alt="Seu Madruga" height="100">                 | <img src="frontend/img/lua.png" alt="Lua" height="50">                   | http://localhost:8005 |
| <img src="frontend/img/chiquinha.png" alt="Chiquinha" height="100">                     | <img src="frontend/img/perl.png" alt="Perl" height="50">                 | http://localhost:8006 |
| <img src="frontend/img/nhonho.png" alt="Nhonho" height="100">                           | <img src="frontend/img/go.png" alt="Go" height="50">                     | http://localhost:8007 |
| <img src="frontend/img/seu-barriga.png" alt="Seu Barriga" height="100">                 | <img src="frontend/img/java.png" alt="Java" height="50">                 | http://localhost:8008 |
| <img src="frontend/img/dona-clotilde.png" alt="Dona Clotilde" height="100">             | <img src="frontend/img/swift.png" alt="Swift" height="50">               | http://localhost:8009 |
| <img src="frontend/img/jaiminho.png" alt="Carteiro Jaiminho" height="100">              | <img src="frontend/img/sh.png" alt="Shell Script" height="50">           | http://localhost:8010 |
| <img src="frontend/img/popis.png" alt="Popis" height="100">                             | <img src="frontend/img/crystal.png" alt="Crystal" height="50">           | http://localhost:8011 |
| <img src="frontend/img/godinez.png" alt="Godinez" height="100">                         | <img src="frontend/img/typescript.png" alt="TypeScript" height="50">     | http://localhost:8012 | 
| <img src="frontend/img/paty.png" alt="Paty" height="100">                               | <img src="frontend/img/coffeescript.png" alt="CoffeeScript" height="50"> | http://localhost:8013 | 
| <img src="frontend/img/dr-chapatin.png" alt="Doutor Chapatin" height="100">             | <img src="frontend/img/c++.png" alt="C++" height="50">                   | http://localhost:8014 | 
 

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
