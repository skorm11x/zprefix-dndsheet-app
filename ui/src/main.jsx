import { createRoot } from 'react-dom/client';
import Layout from './layout/Layout.jsx';
import HomePage from './routes/HomePage.jsx';
import GamePage from './routes/GamePage.jsx';
import EnvironmentPage from './routes/EnvironmentPage.jsx';
import CharacterPage from './routes/CharacterPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import ProfilePage from './routes/ProfilePage.jsx';

import { createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: "/",
        element: <HomePage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/games",
        element: <GamePage />
      },
      {
        path: "/environments",
        element: <EnvironmentPage />
      },
      {
        path: "/characters",
        element: <CharacterPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
