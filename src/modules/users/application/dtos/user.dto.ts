import { CtxType } from '../../domain/types';

export class UserDto {
  readonly userId: string;
  readonly email: string;
  readonly username: string;
  readonly contextType: CtxType;
  readonly roleIds: string[];
  readonly isDeleted: boolean;
  readonly isEmailVerified: boolean;
}
