import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { CreateUserCommand } from '../impl';
import { CreateUserUseCase } from '../../useCases/createUser';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends BaseController
  implements ICommandHandler<CreateUserCommand> {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  async execute({ createUserDto }: CreateUserCommand) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
