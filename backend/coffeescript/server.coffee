http = require 'http'
fs = require 'fs'

class RequestHandler
  constructor: ->
    @server = http.createServer @handleRequest.bind(this)

  readPhrases: =>
    try
      jsonFilePath = 'phrases/phrases.json'
      data = fs.readFileSync jsonFilePath, 'utf-8'
      phrases = JSON.parse data

      if 'paty' of phrases
        phrases['paty']
      else
        console.log 'Paty phrases not found in JSON file.'
        []

    catch e
      console.log "Error reading JSON file: #{e}"
      []

  handleRequest: (req, res) =>
    res.writeHead 200,
      'Content-type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'

    phrases = @readPhrases()

    if not phrases.length
      res.write 'Error reading Paty phrases.'
      res.end()
      return

    randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    res.write randomPhrase
    res.end()

  runServer: =>
    host = '0.0.0.0'
    port = 8000

    @server.listen port, host, =>
      console.log "Server running at http://#{host}:#{port}/"

serverInstance = new RequestHandler()
serverInstance.runServer()
