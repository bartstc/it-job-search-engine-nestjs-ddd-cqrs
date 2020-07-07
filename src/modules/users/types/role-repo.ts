import { Role } from '../domain/role';

export interface RoleRepo {
  exists(roleName: string): Promise<boolean>;
  persist(role: Role): Promise<void>;
}
