import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
