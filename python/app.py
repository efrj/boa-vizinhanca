import random
from http.server import BaseHTTPRequestHandler, HTTPServer

# Frases do Professor Girafales
frases = [
    'Se não for incômodo.',
    'Vim lhe trazer este humilde presente.',
    'Depois da senhora.',
    'Dizia eu que a aritmética...',
    'Silêêêêêncioooo!!!',
    'Tá! Tá! Tá! Tá! Tá!',
    'Eu jamais me engano. Só me enganei uma vez: quando acreditei estar enganado!',
    'Quero ver outra vez seus olhinhos de noite serena.',
    'Dooooooooooona Florinda.',
    'Sou Linguiça de sobrenome mestre, digo, sou Professor e meu nome é Girafales.',
    'Por que causa, motivo, razão ou circunstância...',
    'Que foi que você disse?',
    'Gooooooooooooooooooooool de Peléeeeeeeeeeeeeeeeeee ! Ele rebateu de cabeça, quando não havia esperança.',
    'A criança que amanhã será homem, a semente que amanhã será fruto, ao casulo que amanhã será mariposa.',
    'Saiba que tudo que se vende pelas ruas faz mal. Por exemplo : churrasquinho, os refrescos, sanduíches daqueles que vem com maionese, com tomate, cachorro quente, empadas, os pastéis, coxinhas, risoles, etc, etc...',
    'Acapulco me espera, Acapulco me espera...',
    'Eu já tive alunos bons, regulares, ruins, péssimos e o Quico. Mas não se preocupe, é provável que haja piores.',
    'Dona Florinda não está acostumada a ser paquerada pelos velhos gordos.',
    'Eu sou inimigo fidagal da violência, mas se ver o Chaves com a luva de boxe, eu, Professor Girafales, vou quebrar tudo que se chama cara.',
    'Quico, quando é que vai entrar no compasso?',
    'Como ousa ofender essa digníssima dama?'
]

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html;charset=UTF-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Selecionar uma frase aleatória
        frase = random.choice(frases)
        self.wfile.write(frase.encode())

def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Servidor rodando em http://{host}:{port}/')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
