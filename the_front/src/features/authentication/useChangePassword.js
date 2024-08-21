import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AuthService from "../../services/authService.js";
import toast from "react-hot-toast";

export function useChangePassword() {
  const navigate = useNavigate();

  const { mutate: changePass, isLoading } = useMutation({
    mutationFn: async ({ userId, password }) => {
      return AuthService.changePassword(userId, password);
    },
    onSuccess: async () => {
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors de la connexion.`);
      }
    },
  });
  return { changePass, isLoading };
}
