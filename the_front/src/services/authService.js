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
    console.log(login, password);
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
        user: response.data.user, // Supposons que le serveur renvoie des infos utilisateur
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw {
          success: false,
          message: error.response.data.message || "Erreur d'authentification",
          status: error.response.status,
        };
      } else {
        // Pour les autres types d'erreurs
        throw {
          success: false,
          message: "Impossible de se connecter. Veuillez réessayer plus tard.",
        };
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

      // Le serveur devrait invalider le cookie côté serveur
      // Nous n'avons pas besoin de gérer manuellement la suppression du token

      return { success: true, message: "Déconnexion réussie" };
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      throw {
        success: false,
        message: "Erreur lors de la déconnexion. Veuillez réessayer.",
      };
    }
  }

  // Vous pouvez ajouter d'autres méthodes liées à l'authentification ici
}

export default AuthService.getInstance();
