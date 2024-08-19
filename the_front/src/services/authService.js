import ApiService from "./apiService.js";
import { API_CONFIG } from "./apiConfig.js";

class AuthService {
  static instance = null;
  currentUser = null;

  constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials) {
    const response = await ApiService.post(
      API_CONFIG.ENDPOINTS.LOGIN,
      credentials,
    );
    if (response.status === 200) {
      this.currentUser = response.data;
    }
    return response;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }
}

export default AuthService.getInstance();
