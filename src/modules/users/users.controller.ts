import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';

import { CreateUserCommand } from './commands/impl';
import { CreateUserDto } from './useCases/createUser';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto, res));
  }
}
