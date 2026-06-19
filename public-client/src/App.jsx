import Header from "./components/Header";
import Homepage from "../pages/Homepage";
import { useEffect, useState } from "react";

function App() {

  const [backendData, setbackendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL + '/posts');

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setbackendData(data);
        }
      } catch (err) {
        if (isMounted) {
           setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  return(
    <>
      <Header/>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{color: "red" }}>{error}</p>}
      {!loading && !error && (
        <Homepage posts={backendData} />
      )}
      
    </>
  );
}

export default App;
