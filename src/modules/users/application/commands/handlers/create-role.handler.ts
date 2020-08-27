import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateRoleUseCase } from '../../useCases/createRole';
import { CreateRoleCommand } from '../impl';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  async execute({ createRoleDto }: CreateRoleCommand) {
    return await this.createRoleUseCase.execute(createRoleDto);
  }
}
