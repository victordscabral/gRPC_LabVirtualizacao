import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);

  const consultWord = async () => {
    if (!word) {
      alert('Por favor, digite uma palavra.');
      return;
    }

    // Simulação de uma chamada gRPC
    const response = await fetch('http://localhost:5000/consult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word })
    });

    const result = await response.json();
    setResults([...results, result]);
  };

  return (
    <div className="app-container">
      <div className="info-container">
        <h2>Como Utilizar</h2>
        <p>Digite uma palavra no campo de entrada e clique no botão "Consultar Palavra". A tabela será atualizada com a palavra consultada e seu número de ocorrências.</p>
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
        <button onClick={consultWord}>Consultar Palavra</button>
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
                <td>{result.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;