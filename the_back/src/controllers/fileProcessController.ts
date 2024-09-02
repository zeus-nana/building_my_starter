import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/data/etat/');
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split('/')[1];
    // Correction pour les fichiers Excel
    if (ext === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      ext = 'xlsx';
    } else if (ext === 'vnd.ms-excel') {
      ext = 'xls';
    }
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes: string[] = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Le format du fichier n'est pas supporté.", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFile = upload.array('files');

const processData = catchAsync(async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const { file } = req.file;
  // const { id: userId } = req.user;
  console.log(req.files);
  console.log(req.user);
  res.status(200).json({
    status: 'succès',
    message: 'Fichiers chargés avec succès.',
  });
});

export default {
  processData,
  uploadFile,
};
