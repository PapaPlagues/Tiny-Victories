import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import './main.css'
import App from './app/App.jsx'
import AdminPosts from './features/posts/pages/AdminPosts/AdminPosts.jsx';
import ErrorPage from './features/posts/pages/ErrorPage/ErrorPage.jsx';
import Login from './features/posts/pages/Login/Login.jsx';
import ProtectedRoute from './app/layouts/ProtectedRoute.jsx';
import PostForm from './features/posts/pages/PostForm/PostForm.jsx';
import AdminLayout from './app/layouts/AdminLayout/AdminLayout.jsx';

// redirect to admin page, but redirect to admin if not logged in when login works
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Navigate to="/login" replace />},
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
