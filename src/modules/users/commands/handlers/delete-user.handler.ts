import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteUserCommand } from '../impl';
import { DeleteUserUseCase } from '../../useCases/deleteUser';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async execute({ deleteUserDto }: DeleteUserCommand) {
    return await this.deleteUserUseCase.execute(deleteUserDto);
  }
}
