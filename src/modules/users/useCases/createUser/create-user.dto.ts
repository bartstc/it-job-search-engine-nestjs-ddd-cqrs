import { ContextType } from '../../domain/types';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  contextType: ContextType;
  roleIds: string[];
}
