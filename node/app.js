var http = require('http');
var fs = require('fs');

const jsonFilePath = 'phrases/phrases.json';

function readPhrases() {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const allPhrases = JSON.parse(data);

    if ('quico' in allPhrases) {
      return allPhrases['quico'];
    } else {
      console.error('As frases do Quico não foram encontradas no arquivo JSON.');
      return [];
    }
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    return [];
  }
}

http.createServer(function (req, res) {
  const phrases = readPhrases();

  if (phrases.length === 0) {
    res.writeHead(500, {'Content-Type': 'text/plain;charset=UTF-8'});
    res.write('Erro ao ler as frases do Quico.');
    res.end();
    return;
  }

  const indice = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[indice];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Max-Age', '86400');

  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  res.write(randomPhrase);
  res.end();
}).listen(3000, function(){
  console.log('Server running at http://localhost:3000');
});
