import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService.js";

export function useLogout() {
  const { clearUser } = useUser(); // Ajoutez cette ligne
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      clearUser(); // Ajoutez cette ligne
      navigate("/login", { replace: true });
    },
  });
}
