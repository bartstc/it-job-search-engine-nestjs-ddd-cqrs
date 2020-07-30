import { Role } from '../domain/role';
import { CtxType } from '../domain/types';

export interface RoleRepo {
  exists(roleName: string): Promise<boolean>;
  getPermissions(roleIds: string[]): Promise<string[]>;
  getRoleByRoleId(roleId: string): Promise<Role>;
  getRolesByContextType(contextType: CtxType): Promise<Role[]>;
  persist(role: Role): Promise<void>;
}
