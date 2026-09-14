import Kitura
import Foundation

let currentDirectory = FileManager.default.currentDirectoryPath
let jsonPath = currentDirectory + "/phrases/phrases.json"

guard let jsonData = FileManager.default.contents(atPath: jsonPath) else {
    fatalError("Could not read JSON file")
}

let json = try! JSONSerialization.jsonObject(with: jsonData, options: []) as! [String: [String]]
let godinezPhrases = json["godinez"] ?? []

let router = Router()

router.get("/") { _, response, _ in
    let randomPhrase = godinezPhrases.randomElement() ?? ""
    response.headers.setType("text/html", charset: "UTF-8")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.send(randomPhrase)
}

Kitura.addHTTPServer(onPort: 8000, with: router)
Kitura.run()
