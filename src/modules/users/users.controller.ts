import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import {
  CreateRoleCommand,
  CreateUserCommand,
  DeleteRoleCommand,
  DeleteUserCommand,
  LoginUserCommand,
} from './commands/impl';
import { CreateUserDto } from './useCases/createUser';
import { LoginUserDto } from './useCases/loginUser';
import { CreateRoleDto } from './useCases/createRole';
import { ContextType } from './domain/types';
import { GetRolesQuery } from './queries/impl';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto, res));
  }

  @Post('/signin')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    return this.commandBus.execute(new LoginUserCommand(loginUserDto, res));
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response) {
    return this.commandBus.execute(new DeleteUserCommand({ userId }, res));
  }

  @Post('/roles')
  async createRole(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    return this.commandBus.execute(new CreateRoleCommand(createRoleDto, res));
  }

  @Delete('/roles/:roleId')
  async deleteRole(@Param('roleId') roleId: string, @Res() res: Response) {
    return this.commandBus.execute(new DeleteRoleCommand({ roleId }, res));
  }

  @Get('/roles/:contextType')
  async getRoles(
    @Param('contextType') contextType: ContextType,
    @Res() res: Response,
  ) {
    return this.queryBus.execute(new GetRolesQuery({ contextType }, res));
  }
}
