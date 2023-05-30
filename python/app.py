from flask import Flask
import random

app = Flask(__name__)

frases = [
    'Se não for incômodo',
    'Vim lhe trazer este humilde presente',
    'Depois da senhora',
    'Dizia eu que a aritmética...',
    'Silêêêêêncioooo...',
    'Tá! Tá! Tá! Tá! Tá!'
]

@app.route('/')
def frase_aleatoria():
    frase = random.choice(frases)
    return f'Frase aleatória: {frase}'

if __name__ == '__main__':
    app.run()
