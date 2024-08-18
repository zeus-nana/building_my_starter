import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCreationAttributes } from "../../types/User.ts";
import AdminService, {
  CreateUserResponse,
} from "../../services/adminService.ts";
import { ApiResponse } from "../../services/apiService.ts";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";

export function useCreateUser(onCloseModal?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: creatingUser, isLoading: isCreating } = useMutation({
    mutationFn: async (newUser: UserCreationAttributes) => {
      return await AdminService.createUser(newUser);
    },
    onSuccess: async (data: ApiResponse<CreateUserResponse>) => {
      toast.success(data.data.message);
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onCloseModal?.();
    },

    onError: (error: Error | AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`Erreur: ${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors de la création de l'utilisateur.`);
      }
    },
  });

  return {
    creatingUser,
    isCreating,
  };
}
