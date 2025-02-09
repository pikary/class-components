import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/*', // Match all routes
    element: <App />,
  },
]);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router}></RouterProvider>
        {/* <App /> */}
      </ErrorBoundary>
    </StrictMode>
  );
}
