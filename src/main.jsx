import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ModeProvider } from './ModeContext'; // Import the ModeProvider
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModeProvider>
  </StrictMode>
);