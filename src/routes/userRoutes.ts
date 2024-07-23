import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.route('/:id').get(usersController.getUserById);

router
  .route('/')
  .get(usersController.getAllUser)
  .post(usersController.createUser);

export default router;
