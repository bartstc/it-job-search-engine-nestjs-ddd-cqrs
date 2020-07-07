import { ContextType } from '../domain/types';

export class RoleDto {
  readonly roleId: string;
  readonly name: string;
  readonly contextType: ContextType;
  readonly permissions: string[];
}
