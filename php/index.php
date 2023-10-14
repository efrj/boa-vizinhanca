<?php

header("Access-Control-Allow-Origin: *");

$phrases = json_decode(file_get_contents('phrases/phrases.json'), true);

$chavesPhrases = $phrases['chaves'];

$indice = array_rand($chavesPhrases);
$randomphrase = $chavesPhrases[$indice];

echo $randomphrase;
?>
