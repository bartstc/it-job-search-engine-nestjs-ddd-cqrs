import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AppError, BaseController } from 'shared/core';

import { CreateRoleUseCase } from '../../useCases/createRole';
import { CreateRoleCommand } from '../impl';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler extends BaseController
  implements ICommandHandler<CreateRoleCommand> {
  constructor(private createRoleUseCase: CreateRoleUseCase) {
    super();
  }

  logger = new Logger('CreateRoleCommand');

  async execute({ res, createRoleDto }: CreateRoleCommand) {
    try {
      const result = await this.createRoleUseCase.execute(createRoleDto);

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
