import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';

import {
  CreateUserCommand,
  DeleteUserCommand,
  LoginUserCommand,
} from './commands/impl';
import { CreateUserDto } from './useCases/createUser';
import { LoginUserDto } from './useCases/loginUser';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
