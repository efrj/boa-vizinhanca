<?php

header("Access-Control-Allow-Origin: *");

$phrases = json_decode(file_get_contents('phrases/phrases.json'), true);

$chavesPhrases = $phrases['chaves'];

$indice = random_int(0, count($chavesPhrases) - 1);
$randomphrase = $chavesPhrases[$indice];

echo $randomphrase;
?>
