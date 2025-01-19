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
    <div className="container">
      <h1>Laboratório: Virtualização gRPC</h1>
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
  );
}

export default App;