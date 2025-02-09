import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import SearchPage from './pages/SearchPage';
import CharacterDetails from './components/CharacterDetails';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/search',
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
