import { Knex } from 'knex';

export interface UserPermission {
  user_id: number;
  permission_id: number;
  active: boolean;
  created_by: number | null;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export type UserPermissionCreationAttributes = Omit<
  UserPermission,
  'created_at' | 'updated_at'
>;

export type UserPermissionUpdatableFields = Partial<
  Pick<UserPermission, 'active' | 'updated_by'>
>;

declare module 'knex/types/tables' {
  interface Tables {
    users_permissions: UserPermission;
    users_permissions_composite: Knex.CompositeTableType<
      UserPermission,
      UserPermissionCreationAttributes,
      UserPermissionUpdatableFields
    >;
  }
}
