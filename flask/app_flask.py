from flask import Flask, jsonify
from flask_cors import CORS
from random import choice
import json

app = Flask(__name__)
CORS(app)  # Adiciona suporte CORS ao aplicativo

PHRASES_FILE = "phrases/phrases.json"

def read_phrases():
    with open(PHRASES_FILE) as f:
        data = json.load(f)
    return data.get("godinez", [])

def random_phrase():
    phrases = read_phrases()
    return "No phrases available" if not phrases else choice(phrases)

@app.route('/')
def get_random_phrase():
    return random_phrase()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)