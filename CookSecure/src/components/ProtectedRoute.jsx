import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authService";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/connect" />;
  if (role && currentUser.role !== role) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;