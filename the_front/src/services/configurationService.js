import ApiService from './apiService.js';
import { API_CONFIG } from './apiConfig.js';
import axios from 'axios';

class ConfigurationService {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  // Services pour les états
  async getAllEtats() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.CONFIGURATION.ETAT}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de récupérer la liste des états. Veuillez réessayer plus tard.');
      }
    }
  }

  async createUpdateEtat(etatData) {
    try {
      return await ApiService.post(`${API_CONFIG.ENDPOINTS.CONFIGURATION.ETAT}`, etatData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error("Impossible de créer ou mettre à jour l'état. Veuillez réessayer plus tard.");
      }
    }
  }

  // Services pour les clés de liste
  async getAllCleListes() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.CONFIGURATION.CLE_LISTE}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de récupérer les clés de liste. Veuillez réessayer plus tard.');
      }
    }
  }

  async createUpdateCleListe(cleListeData) {
    try {
      return await ApiService.post(`${API_CONFIG.ENDPOINTS.CONFIGURATION.CLE_LISTE}`, cleListeData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de créer ou mettre à jour la clé de liste. Veuillez réessayer plus tard.');
      }
    }
  }

  // Services pour les listes
  async getAllListes() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.CONFIGURATION.LISTE}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de récupérer les listes. Veuillez réessayer plus tard.');
      }
    }
  }

  async createUpdateListe(listeData) {
    try {
      return await ApiService.post(`${API_CONFIG.ENDPOINTS.CONFIGURATION.LISTE}`, listeData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de créer ou mettre à jour la liste. Veuillez réessayer plus tard.');
      }
    }
  }

  async getListesByCleListe(libelle) {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.CONFIGURATION.LISTE_BY_CLE}/${libelle}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error('Impossible de récupérer les listes pour cette clé. Veuillez réessayer plus tard.');
      }
    }
  }
}

export default ConfigurationService.getInstance();
