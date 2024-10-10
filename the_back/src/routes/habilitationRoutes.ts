import express from 'express';
import habilitationController from '../controllers/habilitationController';
import authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

// Menu routes
router.post('/menu', habilitationController.createMenu);

// Permission routes
router.post('/permission', habilitationController.createPermission);

// Fonction routes
router.post('/fonction', habilitationController.createFonction);

// Liaison Fonction-Menu-Permission routes
router.post(
  '/fonction-menu-permission',
  habilitationController.createFonctionMenuPermission,
);

export default router;
