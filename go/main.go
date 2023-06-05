package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

var phrases = []string{
	"Olha ele, hein! Olha ele, hein!",
	"O que será que ele quis dizer?",
	"É assim, né? É assim , né?",
	"Tinha que ser o Chaves de novo!",
	"Você vai ver, Chaves, vou contar tudo pro meu papai!",
	"Gavião em inglês é gaviaion.",
}

func randomPhrase() string {
	rand.Seed(time.Now().UnixNano())
	index := rand.Intn(len(phrases))
	return phrases[index]
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, randomPhrase())
}

func main() {
	http.HandleFunc("/", handleRequest)
	fmt.Println("Servidor rodando em http://localhost:8000/")
	http.ListenAndServe(":8000", nil)
}
