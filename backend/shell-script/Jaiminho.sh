#!/bin/bash

json_file='phrases/phrases.json'

while true; do
  phrase=$(jq -r '.jaiminho | .[]' "$json_file" | shuf -n 1)
  echo -e "HTTP/1.1 200 OK\nContent-Type: text/html;charset=UTF-8\nAccess-Control-Allow-Origin: *\n\n$phrase" | nc -l -p 80 -q 1
done
