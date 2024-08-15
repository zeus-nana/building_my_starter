import ApiService, { ApiResponse } from "./apiService";
import { API_CONFIG } from "./apiConfig";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  status: string;
  // autres champs utilisateur si nécessaire...
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    const response = await ApiService.post<User>(API_CONFIG.ENDPOINTS.LOGIN, credentials);
    if (response.status === 200) {
      this.currentUser = response.data;
    }
    return response;
  }

  // public async logout(): Promise<void> {
  //   await ApiService.post(API_CONFIG.ENDPOINTS.LOGOUT);
  //   this.currentUser = null;
  // }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // public async refreshUserInfo(): Promise<void> {
  //   try {
  //     const response = await ApiService.get<User>(API_CONFIG.ENDPOINTS.USER_INFO);
  //     this.currentUser = response.data;
  //   } catch (error) {
  //     console.error("Erreur lors du rafraîchissement des informations utilisateur", error);
  //     // Gérer l'erreur (par exemple, déconnexion si le token n'est plus valide)
  //   }
  // }
}

export default AuthService.getInstance();