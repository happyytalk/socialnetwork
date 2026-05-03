import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RoomsProvider } from './contexts/RoomsContext';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');
// Silence AbortError and lock-related unhandled rejections
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const name = reason?.name;
  const message = reason?.message;
  
  if (name === 'AbortError' || 
      message?.includes('aborted') || 
      message?.includes('Lock broken by another request') ||
      message?.includes('Lock was stolen')) {
    event.preventDefault();
  }
});


if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider>
              <RoomsProvider>
                <App />
              </RoomsProvider>
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
