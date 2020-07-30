import { CtxType } from '../domain/types';

export class RoleDto {
  readonly roleId: string;
  readonly name: string;
  readonly contextType: CtxType;
  readonly permissions: string[];
}
