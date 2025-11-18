import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import App from './App';
import './styles/globals.css';
import './i18n/config'; // Initialize i18n

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Enable back/forward cache (bfcache) support
window.addEventListener('pageshow', (event) => {
  // If the page was restored from bfcache, reload it to ensure fresh state
  if (event.persisted) {
    console.log('Page restored from bfcache');
    // Page was loaded from cache - state is preserved
    // No need to reload, just ensure React hydrates properly
  }
});

// Handle page hide for bfcache
window.addEventListener('pagehide', (event) => {
  // Don't do any blocking operations here
  // Allow the browser to cache the page
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);