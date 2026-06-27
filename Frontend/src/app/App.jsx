import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [res, setRes] = useState("");
  useEffect(async () => {
    const data = await axios.get("/api");
    setRes(data.data.message);
  }, []);
  return <div>{res}</div>;
};

export default App;
