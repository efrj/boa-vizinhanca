import Kitura

let phrases = [
    "Quem é bruxa? Eu não sou nenhuma bruxa!",
    "Como? Chamou quem de bruxa?",
    "Boneco, simpático! Madruguinha lindo!",
    "O quê? É melhor não dizer nada!",
    "Ai, Seu Madruga, o senhor me encabula!",
    "Drudru, Gatão, Galã!",
    "Tinha que ser o Chaves!",
    "Eu vou para Acapulco tomar banho de mar..."
]

let router = Router()

router.get("/") { _, response, _ in
    let randomPhrase = phrases.randomElement() ?? ""
    response.headers.setType("text/html", charset: "UTF-8")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.send(randomPhrase)
}

Kitura.addHTTPServer(onPort: 8000, with: router)
Kitura.run()
