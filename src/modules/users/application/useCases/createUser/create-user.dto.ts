import { CtxType } from '../../../domain/types';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  contextType: CtxType;
  roleIds: string[];
}
