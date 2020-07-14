import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { CreateRoleDto, CreateRoleUseCase } from '../../useCases/createRole';
import { CreateRoleCommand } from '../impl';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler extends BaseController
  implements ICommandHandler<CreateRoleCommand> {
  constructor(private createRoleUseCase: CreateRoleUseCase) {
    super();
  }

  async execute(command: CreateRoleCommand) {
    const { createRoleDto, res } = command;
    this.createRole(createRoleDto, res);
  }

  async createRole(createRoleDto: CreateRoleDto, res: Response) {
    try {
      const result = await this.createRoleUseCase.execute(createRoleDto);

      if (result.isLeft()) {
        const error = result.value;

        Logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      Logger.verbose('Role successfully created');
      return this.ok(res);
    } catch (err) {
      Logger.error(err);
      return this.fail(res, err);
    }
  }
}
