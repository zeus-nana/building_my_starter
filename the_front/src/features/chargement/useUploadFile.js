import { useMutation } from "@tanstack/react-query";
import UploadService from "../../services/uploadService";
import toast from "react-hot-toast";
import axios from "axios";

export function useUploadFile(onCloseModal) {
  // const queryClient = useQueryClient();

  const { mutate: uploadingFiles, isLoading: isUploading } = useMutation({
    mutationFn: async (files) => {
      return await UploadService.uploadFiles(files);
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      // await queryClient.invalidateQueries({
      //   queryKey: ["files"], // Assurez-vous que cette clé correspond à celle utilisée pour récupérer la liste des fichiers
      // });

      if (onCloseModal) onCloseModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`Erreur: ${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors du téléchargement des fichiers.`);
      }
    },
  });

  return {
    uploadingFiles,
    isUploading,
  };
}
