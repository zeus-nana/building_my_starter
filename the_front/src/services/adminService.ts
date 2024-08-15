import ApiService, { ApiResponse } from "./apiService.ts";
import { User } from "../types/User.ts";
import { API_CONFIG } from "./apiConfig.ts";

interface GetAllUsersResponse {
  status: string;
  results: number;
  data: {
    users: User[];
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
    return await ApiService.get<GetAllUsersResponse>(
      `${API_CONFIG.ENDPOINTS.USERS}`,
    );
  }
}

export default AdminService.getInstance();
