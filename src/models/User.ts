import { Knex } from 'knex';

export interface User {
  id: number;
  username: string;
  password: string;
  phone: string | null;
  email: string;
  function: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UserCreationAttributes = Omit<
  User,
  'id' | 'created_at' | 'updated_at'
>;

export type UserUpdatableFields = Partial<
  Pick<User, 'username' | 'phone' | 'function' | 'role' | 'status'>
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
