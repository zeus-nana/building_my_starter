import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/change-password').post(authController.changePassword);
router.route('/verify').get(authController.verifyToken);

export default router;
