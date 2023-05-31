<?php

header("Access-Control-Allow-Origin: *");

# Frases do Chaves do 8
$frases = [
    'Foi sem querer querendo',
    'Volta o cão arrependido, com suas orelhas tão fartas, com seu osso roído e com o rabo entre as patas.',
    'Ninguém tem paciência comigo.',
    'Eu prefiro morrer do que perder a vida.',
    'Ai, que burro. Dá zero pra ele!',
    'Já chegou o disco voador!',
    'Esse é de laranja que parece de limão, mas tem gosto de tamarindo.',
    'Quem dá e tira com o diabo fica, sua mão se danifica, sua vó será maldita, e sua sogra ressuscita.',
    'Teria sido melhor ir ver o filme do Pelé!',
    'Tá bom, mas não se irrite.',
    'Foi sem querer querendo...',
    'Não se deve rezar para que se capture um ladrão. Se deve rezar para que o ladrão se arrependa e se torne bonzinho!',
    'Eu nunca roubei e nunca vou roubar de novo!',
    'Tudo eu! Tudo eu!',
    'Me escapuliu!',
    'Tá bom, mas não se irrite!',
    'Eu vou plantar um pezinho de carambola que vai dar milhões de carambolas. Aí eu vendo os milhões de carambolas e daí eu planto mais milhões de carambolas e com o dinheiro vou morar em um lugar onde ninguém me bata.',
    'Ai pego e zaaz e depois zaaz!',
    'Carne de burro não é transparente.',
    'Quem come tudo e não divide nada acaba com a barriga inchada.',
    'Seu Madruga, o senhor não vai morrer. Vão matar o senhor!',
    'Isso, isso, isso, isso!',
    'Professor Linguiça!',
    'É muito mais fácil sustentar um burro a pão de ló!',
    'Sabe qual o animal que come com o rabo? Todos, porque eles não podem tirar o rabo para comer.',
    'Porque o senhor já me deve 14 meses de recados dados.',
    'Antes de virar mendigo eu prefiro pedir dinheiro na rua.',
    'E como é? E como eu disse?',
    'Tudo por culpa desse par de velhas loucas.',
    'Pipipipipipipipipi...',
    'Mamãe querida... Meu coração por ti bate, como caroço de abacate!',
    'Mas para ter uma mãe, me conformaria até com a mãe do Quico.',
    'Boa noite, meus amigos. Boa noite, vizinhança! Prometemos despedirmos sem dizer adeus jamais.'
];

$indice = array_rand($frases);

$fraseAleatoria = $frases[$indice];

echo $fraseAleatoria;

?>
