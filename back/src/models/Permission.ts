export interface Permission {
  id: number;
  name: string;
  description: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface PermissionCreationAttributes
  extends Omit<Permission, 'id' | 'created_at' | 'updated_at'> {
  created_by: number;
}
