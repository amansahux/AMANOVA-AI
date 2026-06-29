import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

const register = async (payload) => {
  const res = await API.post("/register", payload);
  return res.data;
};
const login = async (payload) => {
  const res = await API.post("/login", payload);
  return res.data;
};
const logout = async () => {
  const res = await API.post("/logout");
  return res.data;
};

const authAPI = {
  register,
  login,
  logout,
};
export default authAPI;