"use client";

import React, { useState } from 'react';
import App from './App';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          borderRadius: '50%',
          width: 56,
          height: 56,
          background: '#0D9488',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 28,
          cursor: 'pointer',
        }}
        aria-label={open ? 'Cerrar chatbot' : 'Abrir chatbot'}
      >
        💬
      </button>

      {/* Widget flotante */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            zIndex: 1000,
            width: 370,
            maxWidth: '95vw',
            height: 540,
            maxHeight: '80vh',
            background: 'white',
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Bot real embebido */}
          <App />
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
