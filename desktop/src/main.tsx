import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { ArtistDetailPage } from './pages/ArtistDetailPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/artists/:artistId', element: <ArtistDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
