// agence.types.ts

export interface Agence {
  id: number;
  code_agence: string;
  agence: string;
  gesuni: string;
  reseau: string;
  pole: string;
  type_agence: string;
  v_hv: string;
  telephone: string;
  id_lmt_om: string;
  id_avs_momo: string;
  id_gs_momo: string;
  id_gs_om: string;
  id_avs_wafacash: string;
  id_bacm: string;
  id_intouch: string;
  id_sce_wafacash: string;
  commune_id: number;
  id_western_ecobank: string;
  id_afrik_com_wafacash: string;
  id_western_emi: string;
  id_hop_international: string;
  id_emi_ecobank: string;
  id_uba: string;
  id_ria: string;
  id_axa: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

// Type pour la création d'une nouvelle agence (sans id et timestamps)
export type AgenceCreationAttributes = Omit<
  Agence,
  'id' | 'created_at' | 'updated_at'
>;

// Type pour la mise à jour d'une agence (tous les champs optionnels sauf id)
export type AgenceUpdateAttributes = Partial<Omit<Agence, 'id'>>;
