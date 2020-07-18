import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { DeleteUserCommand } from '../impl';
import { DeleteUserErrors, DeleteUserUseCase } from '../../useCases/deleteUser';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler extends BaseController
  implements ICommandHandler<DeleteUserCommand> {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {
    super();
  }

  logger = new Logger('DeleteUserCommand');

  async execute({ res, deleteUserDto }: DeleteUserCommand) {
    try {
      const result = await this.deleteUserUseCase.execute(deleteUserDto);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          case DeleteUserErrors.UserNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('User successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
