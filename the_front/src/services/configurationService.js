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
}

export default ConfigurationService.getInstance();
