import { Knex } from 'knex';

export interface User {
  id: number;
  username: string;
  password: string;
  phone: string | null;
  email: string;
  department: string;
  role: string;
  active: boolean;
  must_reset_password: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UserCreationAttributes = Omit<
  User,
  'id' | 'active' | 'created_at' | 'updated_at'
>;

export type UserUpdatableFields = Partial<
  Pick<User, 'username' | 'phone' | 'department' | 'active'>
>;

export interface UserValidationResult {
  isValid: boolean;
  message: string;
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    users_composite: Knex.CompositeTableType<
      User,
      UserCreationAttributes,
      UserUpdatableFields
    >;
  }
}
