# flask_service.py
from flask import Flask, request, jsonify
from flask_cors import CORS

import sys

sys.path.append('../../gRPC/grpc-client')

from insert_client import run

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Permitir requisições cross-origin, se necessário

@app.route('/process', methods=['POST'])
def process():
    try:
        # Recebe o JSON enviado pelo frontend
        data = request.get_json()
        
        # Verifica se a chave 'word' está presente no JSON
        word = data.get('word', None)
        if not word:
            return jsonify({"error": "Missing 'word' in request body."}), 400
        
        # Chama o cliente gRPC para obter a lista de WordResponse
        try:
            response_list = run(word)  # Função que interage com o servidor gRPC
        except Exception as e:
            return jsonify({"error": f"gRPC error: {str(e)}"}), 500
        
        # Verifica se a resposta é uma lista válida
        if not isinstance(response_list, list) and word.upper() != 'IMPRIMIR':
            return jsonify({"sucess": "Word saved."}), 200
        
        # Constrói a resposta para o frontend
        result = []
        for item in response_list:
            if isinstance(item, dict) and 'word' in item and 'sum' in item:
                result.append({
                    "word": item['word'],
                    "sum": item['sum']
                })
        
        return jsonify({"result": result}), 200

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)