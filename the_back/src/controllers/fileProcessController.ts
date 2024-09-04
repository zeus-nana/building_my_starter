import { Request, Response } from 'express';
import multer from 'multer';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { defaultJobOptions, fileProcessingQueue } from '../../bullConfig';
import db from '../database/connection';

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
  if (!req.files || !Array.isArray(req.files)) {
    throw new AppError("Aucun fichier n'a été téléchargé.", 400);
  }

  const userId = req.user!.id;

  const fileProcessingPromises = req.files.map(
    async (file: Express.Multer.File) => {
      const chargementData = {
        etat: `${file.originalname.split('.')[0]}`,
        created_by: userId,
        type: 'transaction',
        chemin_fichier: file.path,
        statut: 'e',
      };

      const [id] = await db('chargement').insert(chargementData, 'id');

      await fileProcessingQueue.add(
        'processFile',
        {
          filePath: file.path,
          chargement_id: id,
          fileName: file.originalname.split('.')[0],
        },
        defaultJobOptions,
      );

      return id;
    },
  );

  await Promise.all(fileProcessingPromises);

  res.status(200).json({
    status: 'succès',
    message: 'Téléchargement effectué avec succès, traitement en cours...',
  });
});

export default {
  processData,
  uploadFile,
};
