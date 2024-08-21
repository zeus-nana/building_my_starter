import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService.js";
import axios from "axios";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: async ({ login, password }) => {
      return AuthService.login(login, password);
    },
    onSuccess: async (data) => {
      console.log(data);
      if (data.user.must_reset_password) {
        toast.success("Vous devez changer votre mot de passe");
        navigate(`/change-password?userId=${data.user.id}`);
      } else {
        navigate("/home", { replace: true });
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors de la connexion.`);
      }
    },
  });
  return { signIn, isLoading };
}

export function useLogout() {}
