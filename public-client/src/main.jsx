import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import ErrorPage from './pages/ErrorPage.jsx'; 
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import './main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage />},
      {path: "posts", element: <Posts />},
      {path: "posts/:postId", element: <Post />}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
