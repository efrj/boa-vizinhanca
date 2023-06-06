var http = require('http');

const phrases = [
  'Que que foi, que que foi, que que há?',
  'Tinha que ser o Chaves mesmo!',
  'Só não te dou outra porque...',
  'Com toda Barriga, senhor certeza',
  'Sou pobre, porém honrado!',
  'Quero ver outra vez seus olhinhos de noite serena.',
  'Posso não ter um centavo no bolso, mas tenho um sorriso no rosto e isso vale mais que todo dinheiro do mundo.',
  'A vingança nunca é plena, mata a alma e envenena.',
  'Somente as pessoas ruins sentem prazer em ver o sofrimento alheio.',
  'O trabalho não é ruim. Ruim é ter de trabalhar!',
  'As pessoas boas devem amar os seus inimigos.',
  'Eu sabia que você era idiota, mas não a nível executivo!',
  'Eu, mesmo sem um centavo no bolso, sempre trago no rosto um sorriso franco e espontâneo.',
  'Devemos perdoar as ofensas... Devemos perdoar as afrontas... Devemos perdoar os aluguéis atrasados...',
  'Às vezes temos que sacrificar algumas coisas para conseguir outras.',
  'Somente um idiota responde uma pergunta com outra pergunta'
];

http.createServer(function (req, res) {
  const indice = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[indice];
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  res.write(randomPhrase);
  res.end();
}).listen(3000, function(){
  console.log('Server running at http://localhost:3000}');
});
