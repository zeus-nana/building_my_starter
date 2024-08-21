import ApiService from "./apiService.js";
import { API_CONFIG } from "./apiConfig.js";
import axios from "axios";

class AuthService {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(login, password) {
    try {
      const response = await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        {
          login,
          password,
        },
        {
          withCredentials: true, // Important pour permettre l'envoi et la réception de cookies
        },
      );
      // La réponse contient probablement des informations sur l'utilisateur
      return {
        success: true,
        user: response.data.user,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible de se connecter. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async verifyToken() {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible de se connecter. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async logout() {
    try {
      // Appel au endpoint de déconnexion
      await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
        {},
        {
          withCredentials: true,
        },
      );

      return { success: true, message: "Déconnexion réussie" };
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      throw {
        success: false,
        message: "Erreur lors de la déconnexion. Veuillez réessayer.",
      };
    }
  }

  async changePassword(userId, newPassword) {
    try {
      const response = await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD,
        {
          userId,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );

      return {
        success: true,
        message: response.data.message,
        user: response.data.user,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible de changer le mot de passe. Veuillez réessayer plus tard.",
        );
      }
    }
  }
}

export default AuthService.getInstance();
