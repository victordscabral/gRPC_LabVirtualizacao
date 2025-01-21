import './App.css';
import React, { useState } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);

  const consultWord = async () => {
    if (!word) {
      alert('Por favor, digite uma palavra.');
      return;
    }

    // Requisição para o backend
    const response = await fetch('http://localhost:8080/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word })
    });

    // Verifica a resposta do backend
    const result = await response.json();

    // Atualiza o estado com os resultados
    if (result.result) {
      setResults(result.result);  // Atualiza corretamente com os dados recebidos
    } else {
      alert(result.error || 'Erro desconhecido.');
    }
  };

  return (
    <div className="app-container">
      <div className="info-container">
        <h2>Como Utilizar</h2>
        <p>Digite uma palavra no campo de entrada e clique no botão "Adicionar Palavra". A tabela será atualizada com a palavra adicionada e seu número de ocorrências.</p>
        <p>Escreva "imprimir" e clique em "Adicionar Palavra" para ver a lista de palavras salvas e ocorrência.</p>
        <h2>Sobre o Projeto</h2>
        <p>Este projeto é um microserviço de dicionário de palavras utilizando gRPC e virtualização. Ele permite armazenar e contar palavras de forma distribuída.</p>
      </div>
      <div className="main-container">
        <h1>Microserviço de Dicionário de Palavras</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Digite a palavra"
        />
        <button onClick={consultWord}>Adicionar Palavra</button>
        <table>
          <thead>
            <tr>
              <th>Palavra</th>
              <th>Número de Ocorrências</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.word}</td>
                <td>{result.sum}</td>  {/* Exibe o valor de "sum" */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;