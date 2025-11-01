"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import App from './App';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const floatButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        floatButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // when opened, move focus to close button for accessibility
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <>
      {/* Contenedor flotante fijo */}
      <div className="chatbot-widget-container">
        {/* Botón flotante */}
        <button
          onClick={() => setOpen((v) => !v)}
          ref={floatButtonRef}
          className="chatbot-float-button"
          aria-label={open ? 'Cerrar chatbot' : 'Abrir chatbot'}
        >
          <Image 
            src="/images/avatars/petrolito-chat.webp" 
            alt="Petrolito Chat" 
            width={72}
            height={72}
            className="chatbot-avatar-icon"
            priority
          />
        </button>

        {/* Widget flotante */}
        {open && (
          <div className="chatbot-widget-window">
            {/* Close button moderno */}
            <div className="chatbot-header">
              <button
                ref={closeButtonRef}
                onClick={() => {
                  setOpen(false);
                  // return focus to floating button after close
                  setTimeout(() => floatButtonRef.current?.focus(), 0);
                }}
                aria-label="Cerrar chat"
                title="Cerrar"
                className="chatbot-close-button"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* allow the inner app area to scroll if its content exceeds available space */}
            <div className="chatbot-content">
              <App />
            </div>
          </div>
        )}
      </div>

      {/* Estilos del chatbot */}
      <style jsx>{`
        /* Contenedor principal fijo */
        .chatbot-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999; /* Aumentado de 9999 a 99999 */
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }

        /* Botón flotante */
        .chatbot-float-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #025159 0%, #86A869 100%);
          color: white;
          border: none;
          box-shadow: 
            0 8px 24px rgba(2, 81, 89, 0.35),
            0 4px 12px rgba(0, 0, 0, 0.25),
            0 0 0 4px rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          outline: none;
          padding: 0px;
          overflow: visible;
        }

        .chatbot-float-button:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 
            0 12px 32px rgba(2, 81, 89, 0.45),
            0 6px 16px rgba(0, 0, 0, 0.3),
            0 0 0 5px rgba(134, 168, 105, 0.25);
        }

        .chatbot-float-button:active {
          transform: scale(1.05);
        }

        .chatbot-float-button:focus {
          outline: none;
          box-shadow: 
            0 0 0 4px rgba(2, 81, 89, 0.5),
            0 8px 24px rgba(2, 81, 89, 0.35),
            0 4px 12px rgba(0, 0, 0, 0.25);
        }

        /* Icono del avatar */
        :global(.chatbot-avatar-icon) {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .chatbot-float-button:hover :global(.chatbot-avatar-icon) {
          transform: scale(1.08) rotate(5deg);
        }

        /* Ventana del chatbot */
        .chatbot-widget-window {
          width: 440px;
          max-width: calc(100vw - 24px);
          height: 680px;
          max-height: calc(100vh - 60px);
          border-radius: 24px;
          background: linear-gradient(135deg, #0d1117 0%, #161b22 60%, #025159 100%);
          border: 2px solid rgba(134, 168, 105, 0.3);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(2, 81, 89, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideInUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Header del chatbot */
        .chatbot-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 12px 16px;
          background: rgba(2, 81, 89, 0.5);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(134, 168, 105, 0.2);
        }

        /* Botón de cerrar */
        .chatbot-close-button {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .chatbot-close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .chatbot-close-button:active {
          transform: scale(0.95);
        }

        .chatbot-close-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(2, 81, 89, 0.4);
        }

        /* Contenido del chatbot */
        .chatbot-content {
          flex: 1;
          overflow: auto;
          background: transparent;
        }

        /* Responsive - Mobile */
        @media (max-width: 768px) {
          .chatbot-widget-container {
            bottom: 8px;
            right: 8px;
          }

          .chatbot-float-button {
            width: 60px;
            height: 60px;
          }

          .chatbot-widget-window {
            width: calc(100vw - 12px);
            height: calc(100vh - 40px);
            max-height: calc(100vh - 40px);
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .chatbot-widget-container {
            bottom: 4px;
            right: 4px;
          }

          .chatbot-float-button {
            width: 48px;
            height: 48px;
            padding: 2px;
          }

          .chatbot-widget-window {
            width: calc(100vw - 4px);
            height: calc(100vh - 8px);
            max-height: calc(100vh - 8px);
            border-radius: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
