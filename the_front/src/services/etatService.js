import ApiService from './apiService.js';
import { API_CONFIG } from './apiConfig.js';
import axios from 'axios';

class EtatService {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (!EtatService.instance) {
      EtatService.instance = new EtatService();
    }
    return EtatService.instance;
  }

  async getAllEtats() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.ETAT.ETAT}`);
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
      return await ApiService.post(`${API_CONFIG.ENDPOINTS.ETAT.ETAT}`, etatData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error("Impossible de créer ou mettre à jour l'état. Veuillez réessayer plus tard.");
      }
    }
  }
}

export default EtatService.getInstance();
