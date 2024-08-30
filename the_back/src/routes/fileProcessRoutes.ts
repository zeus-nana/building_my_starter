import express from 'express';
import multer from 'multer';
import fileProcessController from '../controllers/fileProcessController';
import authController from '../controllers/authController';

const upload = multer({ dest: './src/data/etat/' });

const router = express.Router();

router.use(authController.protect);

router
  .route('/upload')
  .post(fileProcessController.uploadFile, fileProcessController.processData);

export default router;
