import { Response } from 'express';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { UserService } from '../../services';
import { LoginUserDto } from './login-user.dto';
import { LoginUserErrors } from './login-user.errors';
import { LoginUserResponse } from './login-user.use-case';

@Controller()
export class LoginUserController extends BaseController {
  constructor(private readonly usersService: UserService) {
    super();
  }

  logger = new Logger('LoginUserController');

  @Post('users/signin')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const result: LoginUserResponse = await this.usersService.loginUser(
        loginUserDto,
      );

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
