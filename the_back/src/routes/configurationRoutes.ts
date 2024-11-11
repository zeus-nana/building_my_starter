import express from 'express';
import authController from '../controllers/authController';
import etatController from '../controllers/etatController';
import listeToUseController from '../controllers/listeToUseController';

const router = express.Router();

router.use(authController.protect);

// Routes pour les etats
router.post('/etat', etatController.createOrUpdateEtat);
router.get('/etat', etatController.getAllEtats);

// Routes pour cle_liste
router.post('/cle-liste', listeToUseController.createOrUpdateCleListe);
router.get('/cle-liste', listeToUseController.getAllCleListes);

// Routes pour liste_to_use
router.post('/liste', listeToUseController.createOrUpdateListeToUse);
router.get('/liste', listeToUseController.getAllListeToUse);
router.get('/liste-by-cle/:libelle', listeToUseController.getListeToUseByCle);

export default router;
