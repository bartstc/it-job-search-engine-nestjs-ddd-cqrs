import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateUserCommand,
  DeleteUserCommand,
  LoginUserCommand,
} from '../commands/impl';
import { CreateUserDto } from '../useCases/createUser';
import { DeleteUserDto } from '../useCases/deleteUser';
import { LoginUserDto } from '../useCases/loginUser';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    return await this.commandBus.execute(new DeleteUserCommand(deleteUserDto));
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return await this.commandBus.execute(new LoginUserCommand(loginUserDto));
  }
}
