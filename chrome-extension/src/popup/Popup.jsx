import React, { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      alert('Escribe un mensaje primero.');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: message }) // Corregido aquí
      });
  
      if (!res.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al conectarse con el backend.');
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Drop Your Question</h2>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="¿Qué quieres saber hoy? yolo..."
        className="chat-textarea"
      />
      
      <button 
        onClick={handleSendMessage}
        className="send-button"
      >
        Enviar ✉️
      </button>
      
      {response && (
        <div className="response-box">
          <p>{response.answer}</p>
          <a 
            href={response.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-more"
          >
            Ver más →
          </a>
        </div>
      )}
    </div>
  );
};

export default Popup;
