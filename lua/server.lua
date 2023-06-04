local socket = require("socket")

local frases = {
    "Cale-se, cale-se, cale-se, você me deixa looooouco!",
    "Você não vai com a minha cara?",
    "Gentalha, Gentalha.",
    "Me chamou de Frederico?",
    "Diz que sim, diz que sim, vai, sim?",
    "Você vai ver, eu vou contar tudo pra minha mãe!",
    "Mamãããããããããããããããããe!!!",
    "Você quer? Compra!",
    "Da parte de quem?",
    "Que coisa, não?",
    "Tá legal!",
    "Espere só até eu ganhar minha bola quadrada.",
    "Não deu!",
    "Ah bom, então assim, sim!",
    "O que será que ele quis dizer?",
}

local function fraseAleatoria()
    local indice = math.random(1, #frases)
    return frases[indice]
end

local server = assert(socket.bind("*", 8000))

print("Servidor rodando em http://localhost:8000/")

while true do
    local client, err = server:accept()

    if client then
        local request = client:receive()

        local response = "HTTP/1.1 200 OK\r\n"
        response = response .. "Access-Control-Allow-Origin: *\r\n" -- Adiciona o cabeçalho CORS
        response = response .. "Content-Type: text/html;charset=UTF-8\r\n"
        response = response .. "\r\n"
        response = response .. fraseAleatoria()

        client:send(response)

        client:close()
    end
end
