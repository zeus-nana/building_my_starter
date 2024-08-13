import ApiService, { ApiResponse } from "./apiService.ts";
import { API_CONFIG } from "./apiConfig.ts";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  // autres champs utilisateur...
}

export const login = (
  credentials: LoginCredentials,
): Promise<ApiResponse<User>> => {
  return ApiService.post<User>(API_CONFIG.ENDPOINTS.LOGIN, credentials);
};

// export const logout = (): Promise<ApiResponse<void>> => {
//     return ApiService.post<void>(API_CONFIG.ENDPOINTS.LOGOUT);
// };

export const getCurrentUser = (): Promise<ApiResponse<User>> => {
  return ApiService.get<User>(API_CONFIG.ENDPOINTS.USERS);
};
