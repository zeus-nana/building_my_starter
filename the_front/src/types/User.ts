export enum UserProfile {
  GESTIONNAIRE = "gestionnaire",
  REPORTING = "reporting",
  IT_SUPPORT = "it_support",
}

export enum UserLocalisation {
  SIEGE = "siège",
  ADAMAOUA = "adamaoua",
  CENTRE = "centre",
  EST = "est",
  EXTREME_NORD = "extreme_nord",
  LITTORAL = "littoral",
  NORD = "nord",
  NORD_OUEST = "nord_ouest",
  OUEST = "ouest",
  SUD = "sud",
  SUD_OUEST = "sud_ouest",
}

export interface User {
  id: number;
  username: string;
  login: string;
  password: string;
  email: string;
  phone: string | null;
  department: string | null;
  profil: UserProfile | null;
  localisation: UserLocalisation | null;
  active: boolean;
  must_reset_password: boolean;
  created_by: number | null;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export type UserCreationAttributes = Omit<
  User,
  | "id"
  | "active"
  | "must_reset_password"
  | "created_at"
  | "updated_at"
  | "created_by"
  | "updated_by"
> & {
  active?: boolean;
  must_reset_password?: boolean;
  created_by?: number;
};

export type UserUpdatableFields = Partial<
  Omit<User, "id" | "created_at" | "updated_at">
>;
