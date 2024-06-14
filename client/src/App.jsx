import Navbar from './components/navbar/Navbar';

import Homepage from './routes/homepage/homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListPage from './routes/listPage/listPage';
import { Layout, RequireAuth } from './routes/layout/layout';
import Login from './routes/login/login';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from './routes/profilePage/profilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import Register from './routes/register/register';
import NewPostPage from './routes/newPostPage/newPostPage';
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from './lib/loaders';
import EditPostPage from './routes/editPostPage/editPostPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Homepage />,
        },
        {
          path: '/list',
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: '/:id',
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: '/profile/Update',
          element: <ProfileUpdatePage />,
        },
        {
          path: '/add',
          element: <NewPostPage />,
        },
        {
          path: '/:id/edit',
          element: <EditPostPage />,
          loader: singlePageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
