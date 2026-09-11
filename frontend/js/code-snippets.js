window.characterBackendCodes = {
    1: {
        filename: "index.php",
        language: "PHP",
        mode: "php",
        prismLang: "php",
        code: `<?php

header("Access-Control-Allow-Origin: *");

$phrases = json_decode(file_get_contents('phrases/phrases.json'), true);

$chavesPhrases = $phrases['chaves'];

$indice = random_int(0, count($chavesPhrases) - 1);
$randomphrase = $chavesPhrases[$indice];

echo $randomphrase;
?>`
    },
    2: {
        filename: "app.py",
        language: "Python",
        mode: "python",
        prismLang: "python",
        code: `import json
import random
from http.server import BaseHTTPRequestHandler, HTTPServer

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html;charset=UTF-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        phrases = read_phrases()

        if not phrases:
            self.wfile.write('Error reading Dona Florinda phrases.'.encode())
            return

        random_phrase = random.choice(phrases)
        self.wfile.write(random_phrase.encode())

def read_phrases():
    try:
        json_file_path = 'phrases/phrases.json'
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        if 'dona_florinda' in data:
            return data['dona_florinda']
        else:
            print('Dona Florinda phrases not found in JSON file.')
            return []
    except Exception as e:
        print(f'Error reading JSON file: {e}')
        return []

def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Server running at http://{host}:{port}/')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()`
    },
    3: {
        filename: "server.lua",
        language: "Lua",
        mode: "lua",
        prismLang: "lua",
        code: `local socket = require("socket")
local json = require("dkjson")

local function readPhrases()
    local file, err = io.open("phrases/phrases.json", "r")
    if not file then
        print("Error reading JSON file: " .. err)
        return {}
    end

    local content = file:read("*all")
    file:close()

    local data = json.decode(content)

    if data and data["seu_madruga"] then
        return data["seu_madruga"]
    else
        print("Seu Madruga phrases not found in JSON file.")
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

        local response = "HTTP/1.1 200 OK\\r\\n"
        response = response .. "Access-Control-Allow-Origin: *\\r\\n"
        response = response .. "Content-Type: text/html;charset=UTF-8\\r\\n"
        response = response .. "\\r\\n"
        response = response .. randomPhrase()

        client:send(response)

        client:close()
    end
end`
    },
    4: {
        filename: "app.rb",
        language: "Ruby",
        mode: "ruby",
        prismLang: "ruby",
        code: `require 'webrick'
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
server.start`
    },
    5: {
        filename: "app.js",
        language: "Node.js",
        mode: "javascript",
        prismLang: "javascript",
        code: `var http = require('http');
var fs = require('fs');

const jsonFilePath = 'phrases/phrases.json';

function readPhrases() {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const allPhrases = JSON.parse(data);

    if ('quico' in allPhrases) {
      return allPhrases['quico'];
    } else {
      console.error('Quico phrases not found in JSON file.');
      return [];
    }
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    return [];
  }
}

http.createServer(function (req, res) {
  const phrases = readPhrases();

  if (phrases.length === 0) {
    res.writeHead(500, {'Content-Type': 'text/plain;charset=UTF-8'});
    res.write('Error reading Quico phrases.');
    res.end();
    return;
  }

  const indice = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[indice];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Max-Age', '86400');

  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  res.write(randomPhrase);
  res.end();
}).listen(3000, function(){
  console.log('Server running at http://localhost:3000');
});`
    },
    6: {
        filename: "script.pl",
        language: "Perl",
        mode: "perl",
        prismLang: "perl",
        code: `use strict;
use warnings;
use IO::Socket::INET;
use JSON::XS;
use Encode;

my $json_file = 'phrases/phrases.json';

my $json_text = do {
    open my $json_fh, '<', $json_file
        or die("Can't open $json_file: $!");
    local $/;
    <$json_fh>
};

my $phrases_ref = decode_json($json_text)->{chiquinha};

my $server = IO::Socket::INET->new(
    LocalAddr => '0.0.0.0',
    LocalPort => 8000,
    Type      => SOCK_STREAM,
    Reuse     => 1,
    Listen    => 10,
) or die "Could not create socket: $!\\n";

print "Server running at http://localhost:8000/\\n";

while (1) {
    my $client = $server->accept();

    if ($client) {
        my $request = <$client>;

        my $response = "HTTP/1.1 200 OK\\r\\n";
        $response .= "Access-Control-Allow-Origin: *\\r\\n";
        $response .= "Content-Type: text/html;charset=UTF-8\\r\\n";
        $response .= "\\r\\n";
        $response .= randomPhrase();

        print $client $response;

        $client->close();
    }
}

sub randomPhrase {
    my $indice = int(rand(scalar @{$phrases_ref}));
    my $phrase = $phrases_ref->[$indice];

    return Encode::encode('UTF-8', $phrase);
}`
    },
    7: {
        filename: "main.go",
        language: "Go",
        mode: "go",
        prismLang: "go",
        code: `package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "time"
)

type Frases struct {
    Nhonho []string \`json:"nhonho"\`
}

var phrases []string

func randomPhrase() string {
    rand.Seed(time.Now().UnixNano())
    index := rand.Intn(len(phrases))
    return phrases[index]
}

func loadPhrases() {
    file, err := ioutil.ReadFile("phrases/phrases.json")
    if err != nil {
        fmt.Println("Error reading JSON file:", err)
        return
    }

    var data Frases
    err = json.Unmarshal(file, &data)
    if err != nil {
        fmt.Println("Error decoding JSON:", err)
        return
    }

    phrases = data.Nhonho
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    fmt.Fprintf(w, randomPhrase())
}

func main() {
    loadPhrases()

    http.HandleFunc("/", handleRequest)

    fmt.Println("Server running at http://localhost:8000/")
    http.ListenAndServe(":8000", nil)
}`
    },
    8: {
        filename: "Main.java",
        language: "Java",
        mode: "text/x-java",
        prismLang: "java",
        code: `import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Main {

    private static final String JSON_FILE_PATH = "phrases/phrases.json";

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/", new MyHandler());
        server.setExecutor(null);
        server.start();
    }

    static class MyHandler implements HttpHandler {
        private final String[] phrases;

        public MyHandler() {
            this.phrases = loadPhrasesFromJson();
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = getRandomPhrase();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Cache-Control", "no-cache, no-store, must-revalidate");
            byte[] responseBytes = response.getBytes("UTF-8");
            exchange.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(responseBytes);
            os.close();
        }

        private String getRandomPhrase() {
            int randomIndex = (int) (Math.random() * phrases.length);
            return phrases[randomIndex];
        }

        private String[] loadPhrasesFromJson() {
            try {
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(new FileReader(JSON_FILE_PATH));
                JSONArray jsonArray = (JSONArray) jsonObject.get("seu_barriga");

                String[] phrases = new String[jsonArray.size()];
                for (int i = 0; i < jsonArray.size(); i++) {
                    phrases[i] = (String) jsonArray.get(i);
                }

                return phrases;
            } catch (IOException | ParseException e) {
                e.printStackTrace();
                return new String[0];
            }
        }
    }
}`
    },
    9: {
        filename: "main.swift",
        language: "Swift",
        mode: "swift",
        prismLang: "swift",
        code: `import Kitura
import Foundation

let currentDirectory = FileManager.default.currentDirectoryPath
let jsonPath = currentDirectory + "/phrases/phrases.json"

guard let jsonData = FileManager.default.contents(atPath: jsonPath) else {
    fatalError("Could not read JSON file")
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
Kitura.run()`
    },
    10: {
        filename: "Jaiminho.sh",
        language: "Shell Script",
        mode: "shell",
        prismLang: "bash",
        code: `#!/bin/bash

json_file='phrases/phrases.json'

while true; do
  phrase=$(jq -r '.jaiminho | .[]' "$json_file" | shuf -n 1)
  echo -e "HTTP/1.1 200 OK\\nContent-Type: text/html;charset=UTF-8\\nAccess-Control-Allow-Origin: *\\n\\n$phrase" | nc -l -p 80 -q 1
done`
    },
    11: {
        filename: "app.cr",
        language: "Crystal",
        mode: "ruby",
        prismLang: "crystal",
        code: `require "http/server"
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
server.listen("0.0.0.0", 80)`
    },
    12: {
        filename: "server.ts",
        language: "TypeScript",
        mode: "text/typescript",
        prismLang: "typescript",
        code: `import * as http from 'http';
import * as fs from 'fs';

class RequestHandler {
  private server: http.Server;

  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private readPhrases(): string[] {
    try {
      const jsonFilePath = 'phrases/phrases.json';
      const data = fs.readFileSync(jsonFilePath, 'utf-8');
      const phrases = JSON.parse(data);

      if ('godinez' in phrases) {
        return phrases['godinez'];
      } else {
        console.log('Godinez phrases not found in JSON file.');
        return [];
      }
    } catch (e) {
      console.log(\`Error reading JSON file: \${e}\`);
      return [];
    }
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    res.writeHead(200, {
      'Content-type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });

    const phrases = this.readPhrases();

    if (!phrases.length) {
      res.write('Error reading Godinez phrases.');
      res.end();
      return;
    }

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    res.write(randomPhrase);
    res.end();
  }

  public runServer() {
    const host = '0.0.0.0';
    const port = 8000;

    this.server.listen(port, host, () => {
      console.log(\`Server running at http://\${host}:\${port}/\`);
    });
  }
}

const serverInstance = new RequestHandler();
serverInstance.runServer();`
    },
    13: {
        filename: "server.coffee",
        language: "CoffeeScript",
        mode: "coffeescript",
        prismLang: "coffeescript",
        code: `http = require 'http'
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
serverInstance.runServer()`
    },
    14: {
        filename: "random_phrase.cpp",
        language: "C++",
        mode: "text/x-c++src",
        prismLang: "cpp",
        code: `#include <httplib.h>
#include <nlohmann/json.hpp>
#include <fstream>
#include <random>

using json = nlohmann::json;

int main() {
    httplib::Server svr;

    svr.Get("/", [](const httplib::Request&, httplib::Response& res) {
        std::ifstream file("phrases/phrases.json");
        json phrases;
        file >> phrases;

        auto& doutorChapatin = phrases["doutor_chapatin"];
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, doutorChapatin.size() - 1);
        int indice = dis(gen);

        std::string randomphrase = doutorChapatin[indice];
        res.set_content(randomphrase, "text/plain");
        res.set_header("Access-Control-Allow-Origin", "*");
    });

    svr.listen("0.0.0.0", 8080);
    return 0;
}`
    },
    15: {
        filename: "app.dart",
        language: "Dart",
        mode: "dart",
        prismLang: "dart",
        code: `import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:http/http.dart' as http;

void main() async {
  final phrasesJson = await File('phrases/phrases.json').readAsString();
  final phrases = jsonDecode(phrasesJson);

  final server = await HttpServer.bind(InternetAddress.anyIPv4, 3000);
  server.listen((request) async {
    final randomPhrase = phrases['chapolin_colorado'][Random().nextInt(phrases['chapolin_colorado'].length)];
    request.response
      ..headers.contentType = ContentType.text
      ..headers.add('Access-Control-Allow-Origin', '*')
      ..write(randomPhrase)
      ..close();
  });

  print('Server started at http://0.0.0.0:3000');
}`
    },
    16: {
        filename: "Main.scala",
        language: "Scala",
        mode: "text/x-scala",
        prismLang: "scala",
        code: `import com.sun.net.httpserver.{HttpExchange, HttpHandler, HttpServer}
import java.io.FileReader
import java.net.InetSocketAddress
import java.nio.charset.StandardCharsets
import org.json.simple.{JSONArray, JSONObject}
import org.json.simple.parser.JSONParser
import scala.util.Random

object Main {
  private val JsonFilePath = "phrases/phrases.json"

  def main(args: Array[String]): Unit = {
    val server = HttpServer.create(new InetSocketAddress(8000), 0)
    server.createContext("/", new MyHandler())
    server.setExecutor(null)
    server.start()
    println("Server running at http://0.0.0.0:8000/")
  }

  class MyHandler extends HttpHandler {
    private val phrases: Array[String] = loadPhrasesFromJson()

    override def handle(exchange: HttpExchange): Unit = {
      val response = getRandomPhrase()
      exchange.getResponseHeaders.set("Content-Type", "text/html; charset=UTF-8")
      exchange.getResponseHeaders.set("Access-Control-Allow-Origin", "*")
      exchange.getResponseHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate")

      val responseBytes = response.getBytes(StandardCharsets.UTF_8)
      exchange.sendResponseHeaders(200, responseBytes.length)

      val os = exchange.getResponseBody
      os.write(responseBytes)
      os.close()
    }

    private def getRandomPhrase(): String = {
      if (phrases.nonEmpty) {
        phrases(Random.nextInt(phrases.length))
      } else {
        "Erro ao ler as frases da Dona Neves."
      }
    }

    private def loadPhrasesFromJson(): Array[String] = {
      try {
        val parser = new JSONParser()
        val jsonObject = parser.parse(new FileReader(JsonFilePath)).asInstanceOf[JSONObject]
        val jsonArray = jsonObject.get("dona_neves").asInstanceOf[JSONArray]

        val result = new Array[String](jsonArray.size())
        for (i <- 0 until jsonArray.size()) {
          result(i) = jsonArray.get(i).asInstanceOf[String]
        }
        result
      } catch {
        case e: Exception =>
          println(s"Erro ao ler o arquivo JSON: \${e.getMessage}")
          Array.empty[String]
      }
    }
  }
}`
    }
};
