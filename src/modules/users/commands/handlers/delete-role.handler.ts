import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { DeleteRoleCommand } from '../impl';
import { DeleteRoleUseCase } from '../../useCases/deleteRole';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler extends BaseController
  implements ICommandHandler<DeleteRoleCommand> {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {
    super();
  }

  async execute({ deleteRoleDto }: DeleteRoleCommand) {
    return await this.deleteRoleUseCase.execute(deleteRoleDto);
  }
}
