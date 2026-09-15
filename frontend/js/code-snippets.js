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
        filename: "index.asp",
        language: "ASP (VBScript)",
        mode: "vbnet",
        prismLang: "vbnet",
        code: `<!--#include file="aspjson.asp"-->
<%
Response.CharSet = "UTF-8"
Response.ContentType = "text/html; charset=utf-8"
Response.AddHeader "Access-Control-Allow-Origin", "*"

Dim fso, file, content, path, oJSON, phrases, count, randIdx
Set fso = Server.CreateObject("Scripting.FileSystemObject")
path = Server.MapPath("phrases/phrases.json")

If fso.FileExists(path) Then
    Set file = fso.OpenTextFile(path, 1)
    content = file.ReadAll
    file.Close

    Dim posStart, posEnd, jsonText
    jsonText = content
    posStart = InStr(content, """seu_madruga""")
    If posStart > 0 Then
        posEnd = InStr(posStart, content, "]")
        If posEnd > posStart Then
            jsonText = "{" & Mid(content, posStart, posEnd - posStart + 1) & "}"
        End If
    End If

    Set oJSON = New aspJSON
    oJSON.loadJSON(jsonText)

    If oJSON.data.Exists("seu_madruga") Then
        Set phrases = oJSON.data("seu_madruga")
        count = phrases.Count
        If count > 0 Then
            Randomize
            randIdx = Int(Rnd * count)
            Response.Write phrases.item(randIdx)
        Else
            Response.Write "Error reading Seu Madruga phrases."
        End If
    Else
        Response.Write "Error reading Seu Madruga phrases."
    End If
Else
    Response.Write "Error reading JSON file: phrases/phrases.json not found."
End If
%>`
    },
    3: {
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
    4: {
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
            self.wfile.write('Error reading Chiquinha phrases.'.encode())
            return

        random_phrase = random.choice(phrases)
        self.wfile.write(random_phrase.encode())

def read_phrases():
    try:
        json_file_path = 'phrases/phrases.json'
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        if 'chiquinha' in data:
            return data['chiquinha']
        else:
            print('Chiquinha phrases not found in JSON file.')
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
    5: {
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
                JSONArray jsonArray = (JSONArray) jsonObject.get("dona_florinda");

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
    6: {
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
    7: {
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

        auto& seuBarriga = phrases["seu_barriga"];
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, seuBarriga.size() - 1);
        int indice = dis(gen);

        std::string randomphrase = seuBarriga[indice];
        res.set_content(randomphrase, "text/plain");
        res.set_header("Access-Control-Allow-Origin", "*");
    });

    svr.listen("0.0.0.0", 8080);
    return 0;
}`
    },
    8: {
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

my $phrases_ref = decode_json($json_text)->{dona_clotilde};

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
    9: {
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
    10: {
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
let godinezPhrases = json["godinez"] ?? []

let router = Router()

router.get("/") { _, response, _ in
    let randomPhrase = godinezPhrases.randomElement() ?? ""
    response.headers.setType("text/html", charset: "UTF-8")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.send(randomPhrase)
}

Kitura.addHTTPServer(onPort: 8000, with: router)
Kitura.run()`
    },
    11: {
        filename: "server.prg",
        language: "Clipper",
        mode: "clojure",
        prismLang: "clojure",
        code: `PROCEDURE Main()
   LOCAL cJson, hData, aPhrases, nIdx, cPhrase
   LOCAL cJsonPath := "phrases/phrases.json"

   cJson := MemoRead(cJsonPath)
   IF Empty(cJson)
      cJson := MemoRead("/app/phrases/phrases.json")
   ENDIF

   hb_jsonDecode(cJson, @hData)

   IF hb_IsHash(hData) .AND. hb_HHasKey(hData, "jaiminho")
      aPhrases := hData["jaiminho"]
      hb_RandomSeed(Seconds())
      nIdx := hb_RandomInt(1, Len(aPhrases))
      cPhrase := aPhrases[nIdx]
      OutStd(cPhrase)
   ELSE
      OutStd("Eu quero evitar a fadiga!")
   ENDIF

   RETURN`
    },
    12: {
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

    if data and data["dona_neves"] then
        return data["dona_neves"]
    else
        print("Dona Neves phrases not found in JSON file.")
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

      if 'popis' of phrases
        phrases['popis']
      else
        console.log 'Popis phrases not found in JSON file.'
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
      res.write 'Error reading Popis phrases.'
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
  phrases = read_phrases("./phrases/phrases.json")["paty"]
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
    15: {
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

      if ('chapolin_colorado' in phrases) {
        return phrases['chapolin_colorado'];
      } else {
        console.log('Chapolin Colorado phrases not found in JSON file.');
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
      res.write('Error reading Chapolin Colorado phrases.');
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
    16: {
        filename: "Main.hs",
        language: "Haskell",
        mode: "text/x-haskell",
        prismLang: "haskell",
        code: `{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

import Network.Wai
import Network.Wai.Handler.Warp
import Network.HTTP.Types
import Data.Aeson
import qualified Data.ByteString.Lazy as BL
import qualified Data.Text as T
import qualified Data.Text.Encoding as TE
import System.Random
import GHC.Generics
import Control.Exception (catch, SomeException(..))

data Phrases = Phrases {
    tripa_seca :: Maybe [T.Text]
} deriving (Show, Generic)

instance FromJSON Phrases

main :: IO ()
main = do
    putStrLn "Server running at http://0.0.0.0:8000/"
    run 8000 app

app :: Application
app _ respond = do
    phrasesResult <- loadPhrases
    case phrasesResult of
        Left err -> do
            putStrLn $ "Error reading JSON file: " ++ err
            respond $ responseLBS status500 [("Content-Type", "text/plain; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] "Error reading Tripa Seca phrases."
        Right phrasesList ->
            if null phrasesList
                then respond $ responseLBS status500 [("Content-Type", "text/plain; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] "Tripa Seca phrases not found in JSON file."
                else do
                    idx <- randomRIO (0, length phrasesList - 1)
                    let chosen = phrasesList !! idx
                    respond $ responseLBS status200 [("Content-Type", "text/html; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] (BL.fromStrict $ TE.encodeUtf8 chosen)

loadPhrases :: IO (Either String [T.Text])
loadPhrases = (do
    contents <- BL.readFile "phrases/phrases.json"
    case decode contents of
        Just p  -> case tripa_seca p of
            Just list -> return (Right list)
            Nothing   -> return (Left "tripa_seca key missing")
        Nothing -> return (Left "Invalid JSON format")
    ) \`catch\` (\\(SomeException e) -> return (Left (show e)))`
    },
    17: {
        filename: "main.ml",
        language: "OCaml",
        mode: "text/x-ocaml",
        prismLang: "ocaml",
        code: `open Yojson.Basic.Util

let json_file = "phrases/phrases.json"

let load_phrases () =
  try
    let json = Yojson.Basic.from_file json_file in
    let phrases_json = json |> member "quase_nada" |> to_list in
    List.map to_string phrases_json
  with
  | exn ->
      Printf.printf "Error reading JSON file: %s\\n%!" (Printexc.to_string exn);
      []

let get_random_phrase phrases =
  match phrases with
  | [] -> "Error reading Quase Nada phrases."
  | list ->
      let len = List.length list in
      let idx = Random.int len in
      List.nth list idx

let () =
  Random.self_init ();
  let server = Tiny_httpd.create ~port:8000 ~addr:"0.0.0.0" () in

  Tiny_httpd.add_route_handler server
    Tiny_httpd.Route.(exact_path "/" return)
    (fun _req ->
      let phrases = load_phrases () in
      let phrase = get_random_phrase phrases in
      let headers = [
        ("Content-Type", "text/html; charset=utf-8");
        ("Access-Control-Allow-Origin", "*");
      ] in
      Tiny_httpd.Response.make_string ~headers (Ok phrase));

  Printf.printf "Server running at http://0.0.0.0:8000/\\n%!";
  match Tiny_httpd.run server with
  | Ok () -> ()
  | Error e -> Printf.eprintf "Server error: %s\\n%!" (Printexc.to_string e)`
    },
    18: {
        filename: "main.zig",
        language: "Zig",
        mode: "zig",
        prismLang: "zig",
        code: `const std = @import("std");
const net = std.net;
const fs = std.fs;
const mem = std.mem;
const print = std.debug.print;

fn loadPhrases(allocator: mem.Allocator) ![][]const u8 {
    const file = try fs.cwd().openFile("phrases/phrases.json", .{});
    defer file.close();

    const content = try file.readToEndAlloc(allocator, 10 * 1024 * 1024);
    defer allocator.free(content);

    var parsed = try std.json.parseFromSlice(std.json.Value, allocator, content, .{});
    defer parsed.deinit();

    if (parsed.value.object.get("alma_negra")) |val| {
        var list = std.ArrayList([]const u8).init(allocator);
        for (val.array.items) |item| {
            const str = try allocator.dupe(u8, item.string);
            try list.append(str);
        }
        return list.toOwnedSlice();
    }
    return error.KeyNotFound;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var prng = std.rand.DefaultPrng.init(@as(u64, @bitCast(std.time.milliTimestamp())));
    const random = prng.random();

    const phrases = loadPhrases(allocator) catch |err| {
        print("Error reading JSON file: {s}\\n", .{@errorName(err)});
        return err;
    };
    defer {
        for (phrases) |p| allocator.free(p);
        allocator.free(phrases);
    }

    const address = try net.Address.parseIp4("0.0.0.0", 8000);
    var server = try address.listen(.{ .reuse_address = true });
    defer server.deinit();

    print("Server running at http://0.0.0.0:8000/\\n", .{});

    while (true) {
        var connection = server.accept() catch |err| {
            print("Accept error: {s}\\n", .{@errorName(err)});
            continue;
        };
        defer connection.stream.close();

        var buf: [1024]u8 = undefined;
        _ = connection.stream.read(&buf) catch continue;

        const phrase = if (phrases.len > 0)
            phrases[random.uintLessThan(usize, phrases.len)]
        else
            "Error reading Alma Negra phrases.";

        var response_buf: [4096]u8 = undefined;
        const response = std.fmt.bufPrint(
            &response_buf,
            "HTTP/1.1 200 OK\\r\\n" ++
                "Content-Type: text/html; charset=utf-8\\r\\n" ++
                "Access-Control-Allow-Origin: *\\r\\n" ++
                "Content-Length: {d}\\r\\n" ++
                "Connection: close\\r\\n" ++
                "\\r\\n" ++
                "{s}",
            .{ phrase.len, phrase },
        ) catch continue;

        _ = connection.stream.writeAll(response) catch continue;
    }
}`
    },
    19: {
        filename: "server.nim",
        language: "Nim",
        mode: "nim",
        prismLang: "nim",
        code: `import asynchttpserver, asyncdispatch, json, random, strutils

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

waitFor main()`
    },
    20: {
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
        "Error reading Racha Cuca phrases."
      }
    }

    private def loadPhrasesFromJson(): Array[String] = {
      try {
        val parser = new JSONParser()
        val jsonObject = parser.parse(new FileReader(JsonFilePath)).asInstanceOf[JSONObject]
        val jsonArray = jsonObject.get("racha_cuca").asInstanceOf[JSONArray]

        val result = new Array[String](jsonArray.size())
        for (i <- 0 until jsonArray.size()) {
          result(i) = jsonArray.get(i).asInstanceOf[String]
        }
        result
      } catch {
        case e: Exception =>
          println(s"Error reading JSON file: \${e.getMessage}")
          Array.empty[String]
      }
    }
  }
}`
    },
    21: {
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
    final randomPhrase = phrases['doutor_chapatin'][Random().nextInt(phrases['doutor_chapatin'].length)];
    request.response
      ..headers.contentType = ContentType.text
      ..headers.add('Access-Control-Allow-Origin', '*')
      ..write(randomPhrase)
      ..close();
  });

  print('Server started at http://0.0.0.0:3000');
}`
    }
};
