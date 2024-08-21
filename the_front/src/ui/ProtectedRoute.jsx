import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // const location = useLocation();

  // if (isLoading) {
  //   // Vous pouvez retourner un composant de chargement ici
  //   return <Spinner />;
  // }
  //
  // if (!user) {
  //   // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  //
  // if (allowedProfiles.length > 0 && !allowedProfiles.includes(user.profile)) {
  //   // Rediriger vers une page non autorisée si l'utilisateur n'a pas le bon profil
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // Si tout est OK, afficher le contenu de la route
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
