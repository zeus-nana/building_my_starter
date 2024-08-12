import express from 'express';
import usersController from '../controllers/usersController';
import authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

// Regular user routes
router.route('/changePassword').patch(usersController.changePassword);
// router.route('/updateMe').patch(usersController.updateOwnProfile);

export default router;
