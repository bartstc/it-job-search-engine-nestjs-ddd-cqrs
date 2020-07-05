import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { CreateUserCommand } from '../impl';
import {
  CreateUserDto,
  CreateUserErrors,
  CreateUserUseCase,
} from '../../useCases/createUser';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends BaseController
  implements ICommandHandler<CreateUserCommand> {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  async execute(command: CreateUserCommand) {
    const { createUserDto, res } = command;
    this.createUser(createUserDto, res);
  }

  async createUser(createUserDto: CreateUserDto, res: Response) {
    try {
      const result = await this.createUserUseCase.execute(createUserDto);

      if (result.isLeft()) {
        const error = result.value;

        Logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          case CreateUserErrors.UsernameTakenError:
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      Logger.verbose('User successfully created');
      return this.ok(res);
    } catch (err) {
      Logger.error(err);
      return this.fail(res, err);
    }
  }
}
