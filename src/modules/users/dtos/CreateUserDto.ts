import { UserEmail, UserName, UserPassword } from '../domain';
import { ContextType } from '../domain/types';

export class CreateUserDto {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  contextType: ContextType;
  roleIds: string[];
  isDeleted?: boolean = false;
  isEmailVerified?: boolean = false;
}
