<?php

$frases = [
    'Foi sem querer querendo',
    'Volta o cão arrependido, com suas orelhas tão fartas, com seu osso roído e com o rabo entre as patas',
    'Ninguém tem paciência comigo',
    'Eu prefiro morrer do que perder a vida',
    'Ai, que burro. Dá zero para ele',
    'Já chegou o disco voador',
    'Esse é de laranja que parece de limão, mas tem gosto de tamarindo',
    'Quem dá e tira com o diabo fica, sua mão se danifica, sua vó será maldita, e sua sogra ressuscita',
    'Era melhor ter ido ver o filme do Pelé',
    'Tá bom, mas não se irrite'
];

$indice = array_rand($frases);

$fraseAleatoria = $frases[$indice];

echo $fraseAleatoria;

?>
