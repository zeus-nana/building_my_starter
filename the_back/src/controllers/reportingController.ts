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

const getDashboardData = catchAsync(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    throw new AppError('Les dates de début et de fin sont requises', 400);
  }

  // Fonction pour créer une date de début (00:00:00)
  const createStartDate = (dateString: string) =>
    new Date(`${dateString}T00:00:00.000Z`);

  // Fonction pour créer une date de fin (23:59:59.999)
  const createEndDate = (dateString: string) =>
    new Date(`${dateString}T23:59:59.999Z`);

  // Créer les objets Date pour le début et la fin de la période courante
  const startDateObj = createStartDate(startDate as string);
  const endDateObj = createEndDate(endDate as string);

  // Calculer la durée exacte en millisecondes
  const duration = endDateObj.getTime() - startDateObj.getTime();

  // Calculer la période précédente
  const previousEndDate = new Date(startDateObj.getTime() - 1); // 1 milliseconde avant le début de la période courante
  const previousStartDate = new Date(previousEndDate.getTime() - duration);

  // Fonction pour générer une série de dates
  const generateDateSeries = (start: Date, end: Date) => {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Générer les séries de dates
  const currentDateSeries = generateDateSeries(startDateObj, endDateObj);
  const previousDateSeries = generateDateSeries(
    previousStartDate,
    previousEndDate,
  );

  // Requête pour obtenir les commissions totales
  const [commissionTotal] = await db('transaction').select([
    db.raw(
      'SUM(CASE WHEN date_operation >= ? AND date_operation <= ? THEN commission ELSE 0 END) as periode_courante',
      [startDateObj.toISOString(), endDateObj.toISOString()],
    ),
    db.raw(
      'SUM(CASE WHEN date_operation >= ? AND date_operation <= ? THEN commission ELSE 0 END) as periode_precedente',
      [previousStartDate.toISOString(), previousEndDate.toISOString()],
    ),
  ]);

  // Fonction pour obtenir les commissions par jour
  const getCommissionParJour = async (
    startDate: Date,
    endDate: Date,
    dateSeries: string[],
  ) => {
    const commissions = await db('transaction')
      .select([
        db.raw(
          "TO_CHAR(DATE(date_operation AT TIME ZONE 'UTC'), 'YYYY-MM-DD') as date",
        ),
        db.raw('SUM(commission) as commission'),
      ])
      .whereBetween('date_operation', [
        startDate.toISOString(),
        endDate.toISOString(),
      ])
      .groupBy(db.raw("DATE(date_operation AT TIME ZONE 'UTC')"))
      .orderBy('date');

    // Créer un objet avec toutes les dates et des commissions à 0
    const commissionsMap = dateSeries.reduce((acc, date) => {
      acc[date] = { date, commission: '0' };
      return acc;
    }, {});

    // Mettre à jour avec les vraies valeurs
    commissions.forEach(({ date, commission }) => {
      commissionsMap[date] = { date, commission: commission.toString() };
    });

    // Convertir l'objet en tableau
    return Object.values(commissionsMap);
  };

  const commissionParJour = await getCommissionParJour(
    startDateObj,
    endDateObj,
    currentDateSeries,
  );
  const commissionParJourPrecedent = await getCommissionParJour(
    previousStartDate,
    previousEndDate,
    previousDateSeries,
  );

  return res.status(200).json({
    status: 'success',
    data: {
      commission_total: {
        periode_courante: commissionTotal.periode_courante,
        periode_precedente: commissionTotal.periode_precedente,
      },
      commission_par_jour: {
        periode_courante: commissionParJour,
        periode_precedente: commissionParJourPrecedent,
      },
    },
  });
});

export default {
  getTransactionByDate,
  getTransactionAgregeByDate,
  getErrorChargementById,
  getChargementByDate,
  getDashboardData,
};
