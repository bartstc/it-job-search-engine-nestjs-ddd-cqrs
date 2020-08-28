import { Response } from 'express';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';

import { AppError, BaseController, ValidationTransformer } from 'shared/core';

import { UserService } from '../../services';
import { CreateUserDto } from './create-user.dto';
import { CreateUserErrors } from './create-user.errors';
import { CreateUserResponse } from './create-user.use-case';
import { createUserSchema } from './create-user.schema';

@Controller()
export class CreateUserController extends BaseController {
  constructor(private readonly usersService: UserService) {
    super();
  }

  logger = new Logger('CreateUserController');

  @Post('users/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        createUserDto,
        createUserSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: CreateUserResponse = await this.usersService.createUser(
        createUserDto,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
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
