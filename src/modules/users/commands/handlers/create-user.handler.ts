import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { CreateUserCommand } from '../impl';
import { CreateUserErrors, CreateUserUseCase } from '../../useCases/createUser';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends BaseController
  implements ICommandHandler<CreateUserCommand> {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  logger = new Logger('CreateUserCommand');

  async execute({ res, createUserDto }: CreateUserCommand) {
    try {
      const result = await this.createUserUseCase.execute(createUserDto);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

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

      this.logger.verbose('User successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
