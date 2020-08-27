import { CreateUserHandler } from './create-user.handler';
import { LoginUserHandler } from './login-user.handler';
import { DeleteUserHandler } from './delete-user.handler';

import { CreateRoleHandler } from './create-role.handler';
import { DeleteRoleHandler } from './delete-role.handler';

export const CommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  DeleteUserHandler,
  CreateRoleHandler,
  DeleteRoleHandler,
];
