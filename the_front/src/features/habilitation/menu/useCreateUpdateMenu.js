import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdminService from '../../../services/adminService.js';

export function useCreateUpdateMenu(onCloseModal) {
  const queryClient = useQueryClient();

  const { mutate: createUpdateMenu, isLoading: isCreatingOrUpdating } = useMutation({
    mutationFn: (data) => AdminService.createUpdateMenu(data),
    onSuccess: (_, variables) => {
      const isEditing = Boolean(variables.id);
      toast.success(isEditing ? 'Menu mise à jour avec succès' : 'Menu créée avec succès');
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      onCloseModal?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue');
    },
  });

  return { isCreatingOrUpdating, createUpdateMenu };
}
