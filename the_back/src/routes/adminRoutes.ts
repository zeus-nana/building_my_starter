import express, { NextFunction, Request } from 'express';
import adminController from '../controllers/adminController';
import authController from '../controllers/authController';
import AppError from '../utils/appError';

const router = express.Router();

// router.use(authController.protect);

// Support/Admin routes
// router.use(authController.restrictTo('support', 'admin'));

router
  .route('/users')
  .get(adminController.getAllUsers)
  .post(adminController.createUpdateUser);

router.route('/users/:id').get(adminController.getUserById);

router
  .route('/reset-user-password/:id')
  .post(adminController.resetUserPassword);

router.route('/activate-user/:id').post(adminController.activateUser);

router.route('/deactivate-user/:id').post(adminController.deactivateUser);

export default router;
