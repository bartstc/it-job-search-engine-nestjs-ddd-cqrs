import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { DeleteRoleCommand } from '../impl';
import { DeleteRoleErrors, DeleteRoleUseCase } from '../../useCases/deleteRole';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler extends BaseController
  implements ICommandHandler<DeleteRoleCommand> {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {
    super();
  }

  logger = new Logger('DeleteRoleCommand');

  async execute({ res, deleteRoleDto }: DeleteRoleCommand) {
    try {
      const result = await this.deleteRoleUseCase.execute(deleteRoleDto);

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
