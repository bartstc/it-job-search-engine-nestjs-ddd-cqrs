import { Role } from '../domain/role';
import { ContextType } from '../domain/types';

export interface RoleRepo {
  exists(roleName: string): Promise<boolean>;
  getPermissions(roleIds: string[]): Promise<string[]>;
  getRoleByRoleId(roleId: string): Promise<Role>;
  getRolesByContextType(contextType: ContextType): Promise<Role[]>;
  persist(role: Role): Promise<void>;
}
