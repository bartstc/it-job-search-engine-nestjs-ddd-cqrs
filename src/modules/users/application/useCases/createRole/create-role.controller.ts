import { Response } from 'express';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { RoleService } from '../../services';
import { CreateRoleDto } from './create-role.dto';
import { CreateRoleResponse } from './create-role.use-case';

@Controller()
export class CreateRoleController extends BaseController {
  constructor(private readonly rolesService: RoleService) {
    super();
  }

  logger = new Logger('CreateRoleController');

  @Post('roles')
  async createRole(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    try {
      const result: CreateRoleResponse = await this.rolesService.createRole(
        createRoleDto,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Role successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
