import { Role } from '../domain/role';

export interface RoleRepo {
  exists(roleName: string): Promise<boolean>;
  getPermissions(roleIds: string[]): Promise<string[]>;
  persist(role: Role): Promise<void>;
}
