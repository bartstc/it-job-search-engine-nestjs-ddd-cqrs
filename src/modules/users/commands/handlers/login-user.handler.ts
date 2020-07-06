import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { LoginUserCommand } from '../impl';
import {
  LoginUserDto,
  LoginUserErrors,
  LoginUserUseCase,
} from '../../useCases/loginUser';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler extends BaseController
  implements ICommandHandler<LoginUserCommand> {
  constructor(private loginUserUseCase: LoginUserUseCase) {
    super();
  }

  async execute(command: LoginUserCommand) {
    const { loginUserDto, res } = command;
    this.loginUser(loginUserDto, res);
  }

  async loginUser(loginUserDto: LoginUserDto, res: Response) {
    try {
      const result = await this.loginUserUseCase.execute(loginUserDto);

      if (result.isLeft()) {
        const error = result.value;

        Logger.error(error.errorValue());

        switch (error.constructor) {
          case LoginUserErrors.UserNameDoesntExistError:
            return this.notFound(res, { ...error.errorValue() });
          case LoginUserErrors.PasswordDoesntMatchError:
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            Logger.error(error.errorValue());
            return this.fail(res, error.errorValue());
        }
      }

      Logger.verbose('User successfully login');
      const dto = result.value.getValue();
      return this.ok(res, dto);
    } catch (err) {
      Logger.error(err);
      return this.fail(res, err);
    }
  }
}
