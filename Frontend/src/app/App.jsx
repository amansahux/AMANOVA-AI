import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [res, setRes] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/auth/me");
        setRes(data.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default App;
