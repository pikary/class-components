import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import SearchPage from './pages/SearchPage';
import CharacterDetails from './components/CharacterDetails';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/search',
      element: <Navigate to="/search/1" replace />,
    },
    {
      path: '/',
      element: <Navigate to="/search" replace />,
    },
    {
      path: '/search/:page',
      element: <SearchPage />,
      children: [
        {
          path: 'details/:id',
          element: <CharacterDetails></CharacterDetails>,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound></NotFound>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
