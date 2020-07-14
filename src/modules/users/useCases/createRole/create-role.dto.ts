import { ContextType } from '../../domain/types';

export interface CreateRoleDto {
  name: string;
  contextType: ContextType;
  permissions: string[];
}
