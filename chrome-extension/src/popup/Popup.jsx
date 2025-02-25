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
      const res = await fetch('http://localhost:3000/api/mensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje: message })
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
    <div className="popup-container">
      <h2>Enviar Mensaje</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleSendMessage}>Enviar</button>
      {response && (
        <div className="response-container">
          <p>{response.mensaje}</p>
          <a href={response.url} target="_blank" rel="noopener noreferrer">
            Ver más
          </a>
        </div>
      )}
    </div>
  );
};

export default Popup;
