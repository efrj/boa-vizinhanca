package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "time"
)

type Frases struct {
    Nhonho []string `json:"nhonho"`
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
        fmt.Println("Erro ao ler o arquivo JSON:", err)
        return
    }

    var data Frases
    err = json.Unmarshal(file, &data)
    if err != nil {
        fmt.Println("Erro ao decodificar o JSON:", err)
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

    fmt.Println("Servidor rodando em http://localhost:8000/")
    http.ListenAndServe(":8000", nil)
}
