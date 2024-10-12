import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdminService from '../../../services/adminService.js';

export function useCreateUpdateFonction(onCloseModal) {
  const queryClient = useQueryClient();

  const { mutate: createUpdateFonction, isLoading: isCreatingOrUpdating } = useMutation({
    mutationFn: (data) => AdminService.createUpdateFonction(data),
    onSuccess: (_, variables) => {
      const isEditing = Boolean(variables.id);
      toast.success(isEditing ? 'Fonction mise à jour avec succès' : 'Fonction créée avec succès');
      queryClient.invalidateQueries({ queryKey: ['fonctions'] });
      onCloseModal?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue');
    },
  });

  return { isCreatingOrUpdating, createUpdateFonction };
}
