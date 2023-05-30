const express = require('express');
const app = express();

const frases = [
  'Que que foi, que que foi, que que há?',
  'Tinha que ser o Chaves mesmo!',
  'Só não te dou outra porque...',
  'Com toda Barriga, senhor certeza',
  'Sou pobre, porém honrado!'
];

app.get('/', (req, res) => {
  const indice = Math.floor(Math.random() * frases.length);
  const fraseAleatoria = frases[indice];
  res.send(`Frase aleatória: ${fraseAleatoria}`);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/');
});
