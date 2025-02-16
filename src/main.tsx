import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/main.scss';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import store from './store/index.ts';
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    </Provider>
  );
}
