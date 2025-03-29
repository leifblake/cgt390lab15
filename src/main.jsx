import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ModeProvider } from './ModeContext'; // Import the ModeProvider
import AuthProvider from './AuthContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
    <AuthProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
     </AuthProvider>
    </ModeProvider>
  </StrictMode>
);