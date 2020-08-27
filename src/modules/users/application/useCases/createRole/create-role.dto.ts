import { CtxType } from '../../../domain/types';

export interface CreateRoleDto {
  name: string;
  contextType: CtxType;
  permissions: string[];
}
