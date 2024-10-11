import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdminService from '../../../services/adminService.js';

export function useCreateFonction(onCloseModal) {
  const queryClient = useQueryClient();

  const { mutate: createFonction, isLoading: isCreating } = useMutation({
    mutationFn: AdminService.createFonction,
    onSuccess: (data) => {
      toast.success('Fonction créée avec succès');
      queryClient.invalidateQueries({ queryKey: ['fonctions'] });
      onCloseModal?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue lors de la création de la fonction');
    },
  });

  return { isCreating, createFonction };
}
