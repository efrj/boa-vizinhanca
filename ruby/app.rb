require 'webrick'

PHRASES = [
  'Professor Girafales! Que milagre o senhor por aqui',
  'Não gostaria de entrar para tomar uma xícara de café?',
  'Vamos, Tesouro, não se misture com essa gentalha!',
  'E da próxima vez vá fazer isso para sua vó!',
  'Tinha que ser o Chaves mesmo.',
  'Tesooooouro.',
  'Fredericooo.',
  'Porque se a gentalha vai para Acapulco, eu também vou!',
  'Tesouro, por favor! Lembre-se que estamos num hotel de categoria. Não na casa do Seu Madruga...',
  'O que a Maitê Proença tem que eu não tenho?!',
  'Todo mundo chora com cebola.'
]

server = WEBrick::HTTPServer.new(Port: 8000)

server.mount_proc '/' do |request, response|
  random_phrase = PHRASES.sample
  response['Content-Type'] = 'text/html;charset=UTF-8'
  response['Access-Control-Allow-Origin'] = '*'
  response['Access-Control-Allow-Methods'] = 'GET'
  response['Access-Control-Max-Age'] = '86400'
  response.body = random_phrase
end

trap('INT') { server.shutdown }
server.start
