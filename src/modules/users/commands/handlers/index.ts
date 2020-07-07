import { CreateUserHandler } from './create-user.handler';
import { LoginUserHandler } from './login-user.handler';
import { DeleteUserHandler } from './delete-user.handler';

export const UsersCommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  DeleteUserHandler,
];
