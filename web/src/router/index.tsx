import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Users from '../features/user';
import ErrorPage from '../features/error';
import Home from '../features/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user',
        element: <Users />,
      },
    ],
  },
]);
