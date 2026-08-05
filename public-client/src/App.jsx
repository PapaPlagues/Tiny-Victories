import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL + "/posts");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setBackendData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const loadInitialPosts = async () => {
      await fetchPosts();
    };

    loadInitialPosts();
  }, [fetchPosts]);

  return (
    <>
      <Header />

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Outlet context={{ backendData, API_URL, refreshPosts: fetchPosts }} />
      )}

      <Footer />
    </>
  );
}

export default App;