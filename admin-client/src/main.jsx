import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './main.css'
import App from './App.jsx'
import AdminPosts from './pages/AdminPosts.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Login />},
      {path: "admin", element: <AdminPosts />},
      // post id
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
