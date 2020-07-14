import { CreateUserHandler } from './create-user.handler';
import { LoginUserHandler } from './login-user.handler';
import { DeleteUserHandler } from './delete-user.handler';

import { CreateRoleHandler } from './create-role.handler';

export const UsersCommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  DeleteUserHandler,
  CreateRoleHandler,
];
