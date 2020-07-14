import { Role } from '../domain/role';

export interface RoleRepo {
  exists(roleName: string): Promise<boolean>;
  getPermissions(roleIds: string[]): Promise<string[]>;
  getRoleByRoleId(roleId: string): Promise<Role>;
  persist(role: Role): Promise<void>;
}
