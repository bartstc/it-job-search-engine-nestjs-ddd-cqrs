import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteRoleCommand } from '../impl';
import { DeleteRoleUseCase } from '../../useCases/deleteRole';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}

  async execute({ deleteRoleDto }: DeleteRoleCommand) {
    return await this.deleteRoleUseCase.execute(deleteRoleDto);
  }
}
