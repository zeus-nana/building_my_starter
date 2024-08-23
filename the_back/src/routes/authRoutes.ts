import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/change-password').post(authController.changePassword);
router.route('/verify').get(authController.verifyToken);
router.route('/current-user').get(
  (req, res, next) => {
    console.log(
      `Requête reçue pour /current-user à ${new Date().toISOString()}`,
    );
    next();
  },
  authController.protect,
  authController.getCurrentUser,
);
export default router;
