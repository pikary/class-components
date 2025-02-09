import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import SearchPage from './pages/SearchPage';
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/search',
      element: <SearchPage />,
    },
    {
      path: '*',
      element: <NotFound></NotFound>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
