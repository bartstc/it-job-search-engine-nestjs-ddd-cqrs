import { Response } from 'express';
import { Controller, Get, Logger, Param, Res } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { RolesService } from '../../services';
import { CtxType } from '../../domain/types';
import { GetRolesErrors } from './get-roles.errors';
import { GetRolesResponse } from './get-roles.use-case';

@Controller()
export class GetRolesController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  logger = new Logger('GetRolesController');

  @Get('roles/:contextType')
  async createRole(
    @Param('contextType') contextType: CtxType,
    @Res() res: Response,
  ) {
    try {
      const result: GetRolesResponse = await this.rolesService.getRoles({
        contextType,
      });

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetRolesErrors.InvalidContextTypeError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Roles successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
