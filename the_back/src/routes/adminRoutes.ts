import express, { NextFunction, Request } from 'express';
import adminController from '../controllers/adminController';
import authController from '../controllers/authController';
import AppError from '../utils/appError';

const router = express.Router();

// router.use(authController.protect);

// Support/Admin routes
// router.use(authController.restrictTo('support', 'admin'));

router
  .route('/')
  .get(adminController.getAllUsers)
  .post(adminController.createUser);

router
  .route('/:id')
  .get(adminController.getUserById)
  .patch(adminController.updateUser);

router.route('/resetPassword').post(adminController.resetPassword);

export default router;
