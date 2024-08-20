/*
*   async getAllUsers() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw new Error(
          `Erreur ${error.response.status}: ${error.response.statusText}`,
        );
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de récupérer la liste des utilisateurs. Veuillez réessayer plus tard.",
        );
      }
    }
  }*/
