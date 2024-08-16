import ApiService, { ApiResponse } from "./apiService.ts";
import { User, UserCreationAttributes } from "../types/User.ts";
import { API_CONFIG } from "./apiConfig.ts";
import axios from "axios";

interface GetAllUsersResponse {
  status: string;
  results: number;
  data: {
    users: User[];
  };
}

interface CreateUserResponse {
  status: string;
  data: {
    userId: User["id"];
  };
}

class AdminService {
  private static instance: AdminService;

  private constructor() {}

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  public async getAllUsers(): Promise<ApiResponse<GetAllUsersResponse>> {
    try {
      return await ApiService.get<GetAllUsersResponse>(
        `${API_CONFIG.ENDPOINTS.ADMIN.USERS}`,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw new Error(
          `Erreur ${error.response.status}: ${error.response.statusText}`,
        );
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de récupérer la liste des utilisateurs. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  public async createUser(
    newUser: UserCreationAttributes,
  ): Promise<ApiResponse<CreateUserResponse>> {
    try {
      return await ApiService.post<CreateUserResponse>(
        `${API_CONFIG.ENDPOINTS.ADMIN.USERS}`,
        newUser,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw error;
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de créer l'utilisateur. Veuillez réessayer plus tard.",
        );
      }
    }
  }
}

export default AdminService.getInstance();
