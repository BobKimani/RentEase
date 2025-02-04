import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import { AuthProvider } from './components/contexts/AuthContext';
import './index.css';

// Get the root DOM element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure 'index.html' has a div with id='root'.");
}

// Create the root and render the app
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
