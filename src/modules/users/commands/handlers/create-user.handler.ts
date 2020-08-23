import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '../impl';
import { CreateUserUseCase } from '../../useCases/createUser';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute({ createUserDto }: CreateUserCommand) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
