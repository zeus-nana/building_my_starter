import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/').post(authController.login);
// router.route('/logout').post(authController.protect authController.logout);

export default router;
