import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { CreateRoleUseCase } from '../../useCases/createRole';
import { CreateRoleCommand } from '../impl';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler extends BaseController
  implements ICommandHandler<CreateRoleCommand> {
  constructor(private createRoleUseCase: CreateRoleUseCase) {
    super();
  }

  logger = new Logger('CreateRoleCommand');

  async execute({ createRoleDto }: CreateRoleCommand) {
    return await this.createRoleUseCase.execute(createRoleDto);
  }
}
