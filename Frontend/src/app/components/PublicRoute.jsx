import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const PublicRoute = ({ children }) => {
  const { user, isHydrating } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isHydrating) {
    return <Loader />;
  }

  if (
    user &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
