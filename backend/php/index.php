<?php
header("Access-Control-Allow-Origin: *");

$frases = json_decode(@file_get_contents('phrases/phrases.json'), true)['chaves'] ?? [];

echo $frases ? $frases[array_rand($frases)] : 'No phrases available.';
?>