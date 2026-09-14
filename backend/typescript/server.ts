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

      if ('chapolin_colorado' in phrases) {
        return phrases['chapolin_colorado'];
      } else {
        console.log('Chapolin Colorado phrases not found in JSON file.');
        return [];
      }
    } catch (e) {
      console.log(`Error reading JSON file: ${e}`);
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
      res.write('Error reading Chapolin Colorado phrases.');
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
