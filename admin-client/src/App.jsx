import './App.css';
import { Outlet } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try{

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);


  return (
    <>

      <Outlet />

    </>
  )
}

export default App
