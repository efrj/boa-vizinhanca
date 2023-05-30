require 'webrick'

FRASES = [
  'Professor Girafales! Que milagre o senhor por aqui',
  'Não gostaria de entrar para tomar uma xícara de café?',
  'Vamos, Tesouro, não se misture com essa gentalha!',
  'E da próxima vez vá dançar com a sua vó!'
]

server = WEBrick::HTTPServer.new(Port: 8000)

server.mount_proc '/' do |request, response|
  frase_aleatoria = FRASES.sample
  response.body = frase_aleatoria
end

trap('INT') { server.shutdown }
server.start
