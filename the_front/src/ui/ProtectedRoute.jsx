import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import AuthService from "../services/authService.js";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const authService = AuthService.getInstance(); // Déplacez la création de l'instance ici
      const isLoggedIn = await authService.verifyToken();
      setIsLoggedIn(isLoggedIn);
      setIsLoading(false);
    };

    verifyToken();
  }, [location]);

  if (isLoading) {
    return <Spinner />; // Affichez le spinner pendant la vérification
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
