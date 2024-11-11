import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import EtatService from '../../services/etatService.js';

export function useGetEtats() {
  const {
    data: etats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['etats'],
    queryFn: async () => {
      const response = await EtatService.getAllEtats();
      return response.data.data.etats;
    },
  });

  return { etats, isLoading, error };
}

export function useCreateUpdateEtat(onCloseModal) {
  const queryClient = useQueryClient();

  const { mutate: createUpdateEtat, isLoading: isCreatingOrUpdating } = useMutation({
    mutationFn: (data) => EtatService.createUpdateEtat(data),
    onSuccess: (_, variables) => {
      const isEditing = Boolean(variables.id);
      toast.success(isEditing ? 'État mis à jour avec succès' : 'État créé avec succès');
      queryClient.invalidateQueries({ queryKey: ['etats'] });
      onCloseModal?.();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`Erreur: ${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors de la création de l'état.`);
      }
    },
  });

  return { isCreatingOrUpdating, createUpdateEtat };
}
