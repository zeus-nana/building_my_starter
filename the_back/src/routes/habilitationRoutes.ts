import express from 'express';
import habilitationController from '../controllers/habilitationController';
import authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

router.post('/menu', habilitationController.createOrUpdateMenu);
router.get('/menu', habilitationController.getAllMenus);

router.post('/permission', habilitationController.createPermission);
router.get('/permission', habilitationController.getAllPermissions);

router.post('/fonction', habilitationController.createOrUpdateFonction);
router.get('/fonction', habilitationController.getAllFonctions);

router.post(
  '/fonction-menu-permission',
  habilitationController.createFonctionMenuPermission,
);
router.get(
  '/fonction-menu-permission',
  habilitationController.getAllFonctionMenuPermissions,
);

export default router;
