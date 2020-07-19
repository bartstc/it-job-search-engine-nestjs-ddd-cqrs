import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { CreateRoleUseCase } from '../../useCases/createRole';
import { CreateRoleCommand } from '../impl';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler extends BaseController
  implements ICommandHandler<CreateRoleCommand> {
  constructor(private createRoleUseCase: CreateRoleUseCase) {
    super();
  }

  async execute({ createRoleDto }: CreateRoleCommand) {
    return await this.createRoleUseCase.execute(createRoleDto);
  }
}
