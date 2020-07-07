import { ContextType } from '../domain/types';

export class UserDto {
  readonly userId: string;
  readonly email: string;
  readonly username: string;
  readonly contextType: ContextType;
  readonly roleIds: string[];
  readonly isDeleted: boolean;
  readonly isEmailVerified: boolean;
}
