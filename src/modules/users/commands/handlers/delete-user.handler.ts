import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { DeleteUserCommand } from '../impl';
import {
  DeleteUserDto,
  DeleteUserErrors,
  DeleteUserUseCase,
} from '../../useCases/deleteUser';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler extends BaseController
  implements ICommandHandler<DeleteUserCommand> {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {
    super();
  }

  async execute(command: DeleteUserCommand) {
    const { deleteUserDto, res } = command;
    this.deleteUser(deleteUserDto, res);
  }

  async deleteUser(deleteUserDto: DeleteUserDto, res: Response) {
    try {
      const result = await this.deleteUserUseCase.execute(deleteUserDto);

      if (result.isLeft()) {
        const error = result.value;

        Logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          case DeleteUserErrors.UserNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      Logger.verbose('User successfully deleted');
      return this.ok(res);
    } catch (err) {
      Logger.error(err);
      return this.fail(res, err);
    }
  }
}
