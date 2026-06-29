import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './main.css'
import App from './App.jsx'
import AdminPosts from './pages/AdminPosts.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PostForm from './pages/PostForm.jsx';
import AdminLayout from './pages/AdminLayout.jsx';

// redirect to admin page, but redirect to admin if not logged in when login works
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {path: "login", element: <Login />},


      {path: "admin", element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {index: true, element: <AdminPosts />},
              {path: "new", element: <PostForm mode="create" method='POST' />},
              {path: ":postId/edit", element: <PostForm mode="edit" method='PUT' />}
            ],
          },    
        ],
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
