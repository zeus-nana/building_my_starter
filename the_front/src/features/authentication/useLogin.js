import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService.js";
import axios from "axios";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: async ({ email, password }) => {
      return AuthService.login(email, password);
    },
    onSuccess: async (user) => {
      console.log(user);
      navigate("/home");
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
