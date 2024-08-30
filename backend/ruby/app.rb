require 'webrick'
require 'json'

phrases = JSON.parse(File.read(File.expand_path('phrases/phrases.json', __dir__)))

server = WEBrick::HTTPServer.new(Port: 8000)

server.mount_proc '/' do |request, response|
  professor_girafales_phrases = phrases['professor_girafales']
  random_phrase = professor_girafales_phrases.sample
  response['Content-Type'] = 'text/html;charset=UTF-8'
  response['Access-Control-Allow-Origin'] = '*'
  response['Access-Control-Allow-Methods'] = 'GET'
  response['Access-Control-Max-Age'] = '86400'
  response.body = random_phrase
end

trap('INT') { server.shutdown }
server.start
