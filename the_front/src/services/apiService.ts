import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_CONFIG } from "./apiConfig.ts";

// Définition d'un type générique pour représenter une réponse API
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      withCredentials: true,
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Gérer la déconnexion ou redirection
          console.log("Utilisateur non autorisé");
          // Exemple : window.dispatchEvent(new CustomEvent('unauthorized'));
        }
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.api.get<T, ApiResponse<T>>(url, config);
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.api.post<T, ApiResponse<T>>(url, data, config);
  }

  // Ajoutez d'autres méthodes HTTP si nécessaire, en suivant le même modèle
}

export default new ApiService();
