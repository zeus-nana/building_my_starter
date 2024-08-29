export interface Transaction {
  id: number;
  chargement_id: number;
  produit: string;
  service: string | null;
  reference: string | null;
  date_operation: Date;
  sens: 'e' | 's';
  montant: number;
  frais_ht: number | null;
  tta: number | null;
  tva: number | null;
  frais_ttc: number | null;
  commission: number | null;
  statut_operation: string | null;
  id_operation: string | null;
  expediteur: string | null;
  beneficiaire: string | null;
  guichet: string | null;
  agence: string | null;
  compagnie: string | null;
  pays: string | null;
  guichet_decharge: string | null;
  agence_decharge: string | null;
  compagnie_decharge: string | null;
  pays_decharge: string | null;
  partenaire: string | null;
  categorie: string | null;
  sous_categorie: string | null;
  responsable: string | null;
  application: string | null;
  v_hv: string | null;
  region: string | null;
  departement: string | null;
  commune: string | null;
  code_agence: string | null;
  pole: string | null;
  extra_1?: string;
  extra_2?: string;
  extra_3?: string;
  extra_4?: string;
  extra_5?: string;
  extra_6?: string;
  extra_7?: string;
  extra_8?: string;
  extra_9?: string;
  extra_10?: string;
  extra_11?: string;
  extra_12?: string;
  extra_13?: string;
  extra_14?: string;
  extra_15?: string;
  extra_16?: string;
  extra_17?: string;
  extra_18?: string;
  extra_19?: string;
  extra_20?: string;
  created_at: Date;
  updated_at: Date;
}