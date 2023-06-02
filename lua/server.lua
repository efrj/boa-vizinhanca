local socket = require("socket")
local cjson = require("cjson")

local function lerFrasesDeArquivo()
    local arquivo = io.open("/app/frases.json", "r")
    if not arquivo then
        return nil
    end

    local conteudo = arquivo:read("*all")
    arquivo:close()

    local frases = cjson.decode(conteudo)
    return frases
end

local function fraseAleatoria()
    local frases = lerFrasesDeArquivo()
    if not frases then
        return "Erro ao ler o arquivo de frases."
    end

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
        response = response .. "Content-Type: text/html;charset=UTF-8\r\n"
        response = response .. "\r\n"
        response = response .. "<html><body>" .. fraseAleatoria() .. "</body></html>\r\n"

        client:send(response)

        client:close()
    end
end
