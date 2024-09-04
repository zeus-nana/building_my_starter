import * as fs from 'fs';
import { Job } from 'bull';
import { Transaction } from '../../models/Transaction';
import csvToJsonParser from './csvToJsonParser';

// TODO : changer de méthode, inclure l'interface des états directement ici et faire la boucle

interface JobData {
  filePath: string;
  chargement_id: number;
  fileName: string;
}

type TransactionMapping = {
  [K in keyof Transaction]?:
    | string
    | { type: 'switch'; field: string; cases: Record<string, any> };
};

async function processEUING(job: Job<JobData>): Promise<void> {
  const { filePath, chargement_id, fileName } = job.data;

  try {
    // Étape 1: Lire le fichier CSV et le convertir en JSON
    const { headers, data } = await csvToJsonParser(filePath);

    console.log('headers', JSON.stringify(headers), 'data', data);

    // Étape 2: Lire le fichier de mapping
    const mappingRaw = fs.readFileSync(
      `./src/data/mapping/${fileName}.json`,
      'utf8',
    );
    const mapping = JSON.parse(mappingRaw).mapping;

    // Étape 3: Traiter chaque ligne et créer des transactions
    const transactions: Transaction[] = data.map((row: any[]) =>
      processRow(row, mapping, headers, chargement_id),
    );

    // Étape 4: Enregistrer les transactions dans la base de données
    await saveTransactions(transactions);

    console.log(
      `Traitement terminé pour le fichier ${fileName}. ${transactions.length} transactions créées.`,
    );
  } catch (error) {
    console.error(`Erreur lors du traitement du fichier ${fileName}:`, error);
    throw error; // Relancer l'erreur pour que Bull puisse la gérer
  }
}

function processRow(
  row: any[],
  mapping: TransactionMapping,
  headers: string[],
  chargement_id: number,
): Transaction {
  const transaction: Partial<Transaction> = { chargement_id };

  for (const [key, value] of Object.entries(mapping) as [
    keyof Transaction,
    string | { type: 'switch'; field: string; cases: Record<string, any> },
  ][]) {
    if (typeof value === 'string') {
      if (value.startsWith('(') && value.endsWith(')')) {
        // Évaluer les expressions JavaScript
        transaction[key] = eval(value.slice(1, -1));
      } else {
        const columnIndex = headers.indexOf(value);
        transaction[key] = columnIndex !== -1 ? row[columnIndex] : null;
      }
    } else if (typeof value === 'object' && value.type === 'switch') {
      const fieldValue = row[headers.indexOf(value.field)];
      transaction[key] = value.cases[fieldValue] || null;
    }
  }

  // Traitement spécial pour la date
  if (transaction.date_operation) {
    transaction.date_operation = new Date(transaction.date_operation);
  }

  // Conversion des champs numériques
  ['montant', 'frais_ht', 'tta', 'tva', 'frais_ttc', 'commission'].forEach(
    (field) => {
      const key = field as keyof Transaction;
      if (transaction[key] !== undefined && transaction[key] !== null) {
        const value = parseFloat(transaction[key] as unknown as string);
        if (!isNaN(value)) {
          transaction[key] = value as any;
        }
      }
    },
  );

  return transaction as Transaction;
}

async function saveTransactions(transactions: Transaction[]): Promise<void> {
  // Implémentez ici la logique pour sauvegarder les transactions dans votre base de données
  // Par exemple, en utilisant un ORM comme Sequelize ou TypeORM
  console.log(
    'Sauvegarde des transactions dans la base de données...',
    JSON.stringify(transactions),
  );
}

export default processEUING;
