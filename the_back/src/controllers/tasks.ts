import { fileProcessingQueue } from '../../bullConfig';
import processEUING from './traitement/euing';

fileProcessingQueue.process('processFile', async (job) => {
  const { filePath, chargement_id, fileName } = job.data;

  console.log(`Traitement du fichier: ${filePath}`);
  console.log(`ID du chargement: ${chargement_id.id}`);
  console.log(`Nom du fichier: ${fileName}`);

  try {
    if (fileName.toLowerCase() === 'euing') {
      // Appel de la fonction processEUING pour les fichiers EUING
      const result = await processEUING(job);
      console.log(`Traitement EUING terminé pour le fichier: ${filePath}`);
      return {
        success: true,
        message: 'Fichier EUING traité avec succès',
        result,
      };
    } else {
      // Logique de traitement pour les autres types de fichiers
      // Simulation d'un traitement générique
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(`Traitement générique terminé pour le fichier: ${filePath}`);
      return { success: true, message: 'Fichier traité avec succès' };
    }
  } catch (error) {
    console.error(`Erreur lors du traitement du fichier ${fileName}:`, error);
    return {
      success: false,
      // message: `Erreur lors du traitement: ${error.message}`,
    };
  }
});

// Exportation pour s'assurer que le fichier est exécuté lors de l'importation
export default {};
