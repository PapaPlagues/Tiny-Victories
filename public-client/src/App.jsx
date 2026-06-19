import Header from "./components/Header";
import Homepage from "../pages/Homepage";
import { useEffect, useState } from "react";

function App() {
  // place states in here
  const [backendData, setbackendData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    fetch(API_URL + "/posts")
    .then( response => response.json())
    .then( data => { setbackendData(data) })
    .catch((error) => console.error(error));
  }, []);

  return(
    <>
      <Header/>
      
      <Homepage/>
    </>
  );
}

export default App;
