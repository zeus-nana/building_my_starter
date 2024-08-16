import { Knex } from 'knex';

export interface Departement {
  id: number;
  departement: string;
  description: string;
  active: boolean;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}
