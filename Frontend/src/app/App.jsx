import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [res, setRes] = useState("");
 useEffect(async () => {
    const data = await axios.get("/api");
    setRes(data.data.message);
  }, []); 
  return <div className="text-5xl">{res}</div>;
};

export default App;
