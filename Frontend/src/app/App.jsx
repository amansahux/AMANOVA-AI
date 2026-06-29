import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setLoading, setUser } from "../features/auth/state/auth.slice";
import { useDispatch } from "react-redux";
import { ToastProvider } from "../shared/toast/ToastContext";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/auth/me");
        if (data.data.success) {
          dispatch(setUser(data.data.user));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, []);

  return (
    <ToastProvider>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </ToastProvider>
  );
};

export default App;
