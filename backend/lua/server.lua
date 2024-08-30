local socket = require("socket")
local json = require("dkjson")

local function readPhrases()
    local file, err = io.open("phrases/phrases.json", "r")
    if not file then
        print("Erro ao ler o arquivo JSON: " .. err)
        return {}
    end

    local content = file:read("*all")
    file:close()

    local data = json.decode(content)

    if data and data["seu_madruga"] then
        return data["seu_madruga"]
    else
        print("As frases do Seu Madruga não foram encontradas no arquivo JSON.")
        return {}
    end
end

local phrases = readPhrases()

local function randomPhrase()
    local index = math.random(1, #phrases)
    return phrases[index]
end

local server = assert(socket.bind("*", 8000))

print("Server running at http://localhost:8000/")

while true do
    local client, err = server:accept()

    if client then
        local request = client:receive()

        local response = "HTTP/1.1 200 OK\r\n"
        response = response .. "Access-Control-Allow-Origin: *\r\n"
        response = response .. "Content-Type: text/html;charset=UTF-8\r\n"
        response = response .. "\r\n"
        response = response .. randomPhrase()

        client:send(response)

        client:close()
    end
end
