import * as http from 'http';
import * as fs from 'fs';

class RequestHandler {
  private server: http.Server;

  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private readPhrases(): string[] {
    try {
      const jsonFilePath = 'phrases/phrases.json';
      const data = fs.readFileSync(jsonFilePath, 'utf-8');
      const phrases = JSON.parse(data);

      if ('godinez' in phrases) {
        return phrases['godinez'];
      } else {
        console.log('Frases do Godinez não encontradas no arquivo JSON.');
        return [];
      }
    } catch (e) {
      console.log(`Erro ao ler o arquivo JSON: ${e}`);
      return [];
    }
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    res.writeHead(200, {
      'Content-type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });

    const phrases = this.readPhrases();

    if (!phrases.length) {
      res.write('Erro ao ler as frases do Godinez.');
      res.end();
      return;
    }

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    res.write(randomPhrase);
    res.end();
  }

  public runServer() {
    const host = '0.0.0.0';
    const port = 8000;

    this.server.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}/`);
    });
  }
}

const serverInstance = new RequestHandler();
serverInstance.runServer();
