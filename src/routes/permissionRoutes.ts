import express from 'express';
import permissionController from '../controllers/permissionController';
import authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .post(authController.protect, permissionController.createPermission);

export default router;
