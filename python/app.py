import json
import random
from http.server import BaseHTTPRequestHandler, HTTPServer

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html;charset=UTF-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        phrases = read_phrases()

        if not phrases:
            self.wfile.write('Erro ao ler as frases da Dona Florinda.'.encode())
            return

        random_phrase = random.choice(phrases)
        self.wfile.write(random_phrase.encode())

def read_phrases():
    try:
        json_file_path = 'phrases/phrases.json'
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        if 'dona_florinda' in data:
            return data['dona_florinda']
        else:
            print('As frases da Dona Florinda não encontradas no arquivo JSON.')
            return []
    except Exception as e:
        print(f'Erro ao ler o arquivo JSON: {e}')
        return []

def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Server running at http://{host}:{port}/')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
