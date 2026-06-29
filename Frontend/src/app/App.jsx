import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setIsHydrating, setLoading, setUser } from "../features/auth/state/auth.slice";
import { useDispatch } from "react-redux";
import { ToastProvider } from "../shared/toast/ToastContext";
import useToast from "../shared/toast/useToast";

const App = () => {
  const toast = useToast()
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
        dispatch(setIsHydrating(false));
      }
    };
    fetchData();
  }, []);
  useEffect(() => { toast.success("Seee.........")  },[])

  return (
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
  );
};

export default App;
