import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const PublicRoute = ({children}) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
