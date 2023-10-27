require "http/server"
require "json"

def read_phrases(file_path)
  file_content = File.read(file_path)
  JSON.parse(file_content)
end

def random_phrase(phrases)
  rand = Random.rand(15)
  phrases[rand]
end

server = HTTP::Server.new do |context|
  phrases = read_phrases("./phrases/phrases.json")["popis"]
  phrase = random_phrase(phrases)

  context.response.headers.add("Access-Control-Allow-Origin", "*")
  context.response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  context.response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
  context.response.content_type = "text/html;charset=UTF-8"
  context.response.print "#{phrase} "
end

puts "Listening on http://0.0.0.0"
server.listen("0.0.0.0", 80)