import random
from http.server import BaseHTTPRequestHandler, HTTPServer

# Lista de frases
frases = [
    'Se não for incômodo',
    'Vim lhe trazer este humilde presente',
    'Depois da senhora',
    'Dizia eu que a aritmética...',
    'Silêêêêêncioooo...',
    'Tá! Tá! Tá! Tá! Tá!',
    'Só me enganei uma vez, quando pensei estar enganado!',
    'Quero ver outra vez seus olhinhos de noite serena.'
]

# Classe handler para tratar as requisições HTTP
class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

        # Selecionar uma frase aleatória
        frase = random.choice(frases)
        self.wfile.write(frase.encode())

# Função para rodar o servidor HTTP
def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Servidor rodando em http://{host}:{port}/')
    httpd.serve_forever()

# Iniciar o servidor
if __name__ == '__main__':
    run_server()
