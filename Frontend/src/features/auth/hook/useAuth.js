import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice";
import authAPI from "../service/auth.api.js";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);


  const register = async (payload) => {
    dispatch(setLoading(true));
    try {
      const res = await authAPI.register(payload);
      return res
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const login = async (payload) => {
    dispatch(setLoading(true));
    try {
      const res = await authAPI.login(payload);
      dispatch(setUser(res.user));
      return res;
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const logout = async () => {
    dispatch(setLoading(true));
    try {
      const res = await authAPI.logout();
      dispatch(setUser(null));
      return res;
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    register,
    login,
    logout,
    user,
    loading,
    error,
  };
};

export default useAuth;
