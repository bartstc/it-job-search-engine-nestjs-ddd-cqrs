import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { LoginUserCommand } from '../impl';
import { LoginUserErrors, LoginUserUseCase } from '../../useCases/loginUser';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler extends BaseController
  implements ICommandHandler<LoginUserCommand> {
  constructor(private loginUserUseCase: LoginUserUseCase) {
    super();
  }

  logger = new Logger('LoginUserCommand');

  async execute({ res, loginUserDto }: LoginUserCommand) {
    try {
      const result = await this.loginUserUseCase.execute(loginUserDto);

      if (result.isLeft()) {
        const error = result.value;

        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case LoginUserErrors.UserNameDoesntExistError:
            return this.notFound(res, { ...error.errorValue() });
          case LoginUserErrors.PasswordDoesntMatchError:
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('User successfully login');
      const dto = result.value.getValue();
      return this.ok(res, dto);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
