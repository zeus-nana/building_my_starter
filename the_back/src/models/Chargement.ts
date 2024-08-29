export interface Chargement {
  id: number;
  etat: string;
  nombre_succes: number;
  nombre_echec: number;
  created_by: number;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}
