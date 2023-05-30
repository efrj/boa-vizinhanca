package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"
)

var frases = []string{
	"De agora em diante, as mulheres vão trabalhar e os homens vão ter os filhos.",
	"Não tem um sábado que eu não tome banho. Porque eu tomo banho todos os sábados, precise ou não precise.",
	"Da discussão nasce à luz.",
	"Os adultos são como as crianças, só que os adultos já estão usados.",
	"O português é um idioma tão bonito quando se fala corretamente.",
	"A higiene manda que não devemos devorar tudo que existe como se fosse um leitão na engorda.",
	"O Quico quebrou meu pirulito. Quebrou o pirulito com a cabeça quando eu lhe dei uma pirulitada.",
	"De agora em diante, nós, mulheres, não temos mais que pedir permissão aos homens para cometer as barbaridades que cometíamos quando não nos davam permissão.",
	"Minhas tias não me deixavam fazer nada, eu queria brincar de fogueirinha com os móveis novos da minha tia, não. Eu queria fazer uma tenda de campanha no jardim, com a cortina da sala, não. Eu queria laçar a televisão com uma corda, não. Acredita que não me deixaram fazer um dominó com as teclas do piano? E com o trabalho que eu tive pra tirar as teclas do piano...",
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fraseAleatoria := frases[rand.Intn(len(frases))]
		fmt.Fprintf(w, "Frase aleatória: %s", fraseAleatoria)
	})

	log.Println("Servidor rodando em http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
