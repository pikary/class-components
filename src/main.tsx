import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/main.scss';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import store from './store/index.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <ThemeProvider>
        <StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </StrictMode>
      </ThemeProvider>
    </Provider>
  );
}
