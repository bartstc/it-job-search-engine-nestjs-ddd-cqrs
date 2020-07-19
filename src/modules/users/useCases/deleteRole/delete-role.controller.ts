import { Response } from 'express';
import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { RolesService } from '../../services';
import { DeleteRoleErrors } from './delete-role.errors';
import { DeleteRoleResponse } from './delete-role.use-case';

@Controller()
export class DeleteRoleController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  logger = new Logger('DeleteRoleController');

  @Delete('roles/:roleId')
  async createRole(@Param('roleId') roleId: string, @Res() res: Response) {
    try {
      const result: DeleteRoleResponse = await this.rolesService.deleteRole({
        roleId,
      });

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          case DeleteRoleErrors.RoleNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Role successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
