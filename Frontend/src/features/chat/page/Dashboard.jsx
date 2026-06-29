import React, { useEffect } from "react";
import useAuth from "../../auth/hook/useAuth";
import useChat from "../hook/useChat.js";

const Dashboard = () => {
  const { initializedSocketConnection } = useChat();
  useEffect(() => {
    initializedSocketConnection();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
