export interface User {
  id: number;
  username: string;
  password: string;
  phone: string;
  email: string;
  department: string;
  role: string;
  active: boolean;
  localisation: string;
  login: string;
  must_reset_password: boolean;
  created_at: Date;
  updated_at: Date;
}
