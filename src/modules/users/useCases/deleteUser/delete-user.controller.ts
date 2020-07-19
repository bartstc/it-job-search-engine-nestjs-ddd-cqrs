import { Response } from 'express';
import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { UsersService } from '../../services';
import { DeleteUserErrors } from './delete-user.errors';
import { DeleteUserResponse } from './delete-user.use-case';

@Controller()
export class DeleteUserController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  logger = new Logger('DeleteUserController');

  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result: DeleteUserResponse = await this.usersService.deleteUser({
        userId,
      });

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
