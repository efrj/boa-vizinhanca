import asynchttpserver, asyncdispatch, json, random, strutils

randomize()

proc loadPhrases(): seq[string] =
  try:
    let jsonNode = parseFile("phrases/phrases.json")
    if jsonNode.hasKey("super_sam"):
      result = @[]
      for item in jsonNode["super_sam"]:
        result.add(item.getStr())
    else:
      echo "super_sam key missing"
      result = @[]
  except Exception as e:
    echo "Error reading JSON file: ", e.msg
    result = @[]

proc cb(req: Request) {.async.} =
  let currentPhrases = loadPhrases()
  var body = ""
  if currentPhrases.len > 0:
    body = sample(currentPhrases)
  else:
    body = "Error reading Super Sam phrases."

  let headers = newHttpHeaders([
    ("Content-Type", "text/html; charset=utf-8"),
    ("Access-Control-Allow-Origin", "*")
  ])
  await req.respond(Http200, body, headers)

proc main() {.async.} =
  var server = newAsyncHttpServer()
  echo "Server running at http://0.0.0.0:8000/"
  await server.serve(Port(8000), cb, "0.0.0.0")

waitFor main()
