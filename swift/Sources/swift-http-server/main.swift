import Kitura
import Foundation

let currentDirectory = FileManager.default.currentDirectoryPath
let jsonPath = currentDirectory + "/phrases/phrases.json"

guard let jsonData = FileManager.default.contents(atPath: jsonPath) else {
    fatalError("Não foi possível ler o arquivo JSON")
}

let json = try! JSONSerialization.jsonObject(with: jsonData, options: []) as! [String: [String]]
let donaClotildePhrases = json["dona_clotilde"] ?? []

let router = Router()

router.get("/") { _, response, _ in
    let randomPhrase = donaClotildePhrases.randomElement() ?? ""
    response.headers.setType("text/html", charset: "UTF-8")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.send(randomPhrase)
}

Kitura.addHTTPServer(onPort: 8000, with: router)
Kitura.run()
