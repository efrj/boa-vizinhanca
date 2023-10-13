#!/bin/bash

while true; do
  phrase=$(shuf -n 1 -e "Eu sou de Tangamandápio" "Sou Jaiminho, o carteiro" "Eu quero evitar a fadiga" "Tangamandápio é minha terra natal. Um lindo povoado com crepúsculos avermelhados..." "Cadê a minha torta?")
  echo -e "HTTP/1.1 200 OK\nContent-Type: text/html;charset=UTF-8\nAccess-Control-Allow-Origin: *\n\n$phrase" | nc -l -p 80 -q 1
done
