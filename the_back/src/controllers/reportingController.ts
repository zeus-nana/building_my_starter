import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import db from '../database/connection';
import { Transaction } from '../models/Transaction';
import AppError from '../utils/appError';

const getTransactionByDate = catchAsync(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return new AppError('Les dates de début et de fin sont requises', 400);
  }

  const transactions: Partial<Transaction>[] = await db<Transaction>(
    'transaction',
  )
    .select(
      'id',
      'etat',
      db.raw(`TO_CHAR(DATE(date_operation), 'YYYY-MM-DD') AS date_operation`),
      'service',
      'reference',
      db.raw(
        `CASE WHEN sens = 'e' THEN 'Entrée' WHEN sens = 's' THEN 'Sortie' END AS sens`,
      ),
      'montant',
      'frais_ht',
      'tta',
      'tva',
      'frais_ttc',
      'commission',
      'statut_operation',
      'expediteur',
      'beneficiaire',
      'guichet',
      'agence',
      'partenaire',
      'categorie',
      'sous_categorie',
      'responsable',
      'application',
      'v_hv',
      'region',
      'departement',
      'commune',
      'code_agence',
      'pole',
    )
    .where(
      'date_operation',
      '>=',
      db.raw(`?::timestamp`, [`${startDate} 00:00:00`]),
    )
    .andWhere(
      'date_operation',
      '<=',
      db.raw(`?::timestamp`, [`${endDate} 23:59:59`]),
    );

  console.log(transactions.length);

  return res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

const getTransactionAgregeByDate = catchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Les dates de début et de fin sont requises',
      });
    }

    console.log('date filtre : ', startDate, endDate);

    const aggregatedTransactions = await db('vw_transaction_agrege')
      .select('*')
      .where('date_operation', '>=', startDate as string)
      .andWhere('date_operation', '<=', endDate as string);

    console.log("nombre d'operation : ", aggregatedTransactions.length);

    return res.status(200).json({
      status: 'success',
      results: aggregatedTransactions.length,
      data: {
        aggregatedTransactions,
      },
    });
  },
);

const getErrorChargementById = catchAsync(
  async (req: Request, res: Response) => {
    const { chargement_id } = req.query;

    const chargeError = await db('erreur_chargement_log')
      .select('*')
      .where({ chargement_id });

    return res.status(200).json({
      status: 'success',
      results: chargeError.length,
      data: {
        chargeError,
      },
    });
  },
);

const getChargementByDate = catchAsync(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Les dates de début et de fin sont requises',
    });
  }

  const chargements = await db('chargement')
    .select(
      'chargement.id',
      'users.login as charge_par',
      'chargement.etat',
      'chargement.type',
      'chargement.nombre_succes',
      'chargement.nombre_echec',
      'chargement.chemin_fichier',
      db.raw(
        `CASE WHEN statut = 'e' THEN 'en_cours' WHEN statut = 't' THEN 'termine' END AS statut`,
      ),
      db.raw('DATE(chargement.created_at) as date_chargement'),
    )
    .join('users', 'chargement.created_by', '=', 'users.id')
    .where(db.raw('DATE(chargement.created_at)'), '>=', startDate as string)
    .andWhere(db.raw('DATE(chargement.created_at)'), '<=', endDate as string)
    .orderBy('chargement.id', 'desc');

  console.log(chargements.length);
  return res.status(200).json({
    status: 'success',
    results: chargements.length,
    data: {
      chargements,
    },
  });
});

export default {
  getTransactionByDate,
  getTransactionAgregeByDate,
  getErrorChargementById,
  getChargementByDate,
};
