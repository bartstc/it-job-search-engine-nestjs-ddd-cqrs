import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { DeleteUserCommand } from '../impl';
import { DeleteUserUseCase } from '../../useCases/deleteUser';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler extends BaseController
  implements ICommandHandler<DeleteUserCommand> {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {
    super();
  }

  async execute({ deleteUserDto }: DeleteUserCommand) {
    return await this.deleteUserUseCase.execute(deleteUserDto);
  }
}
