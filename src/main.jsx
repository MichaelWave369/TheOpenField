import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { SpeechProvider } from './SpeechReader.jsx';
import './styles.css';
import './fieldGuide.css';
import './livingLibrary.css';
import './listeningField.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider><App /></SpeechProvider>
  </React.StrictMode>,
);
