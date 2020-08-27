import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateRoleDto } from '../useCases/createRole';
import { DeleteRoleDto } from '../useCases/deleteRole';
import { GetRolesDto } from '../useCases/getRoles';
import { GetRolesQuery } from '../queries/impl';
import { CreateRoleCommand, DeleteRoleCommand } from '../commands/impl';

@Injectable()
export class RoleService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return await this.commandBus.execute(new CreateRoleCommand(createRoleDto));
  }

  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    return await this.commandBus.execute(new DeleteRoleCommand(deleteRoleDto));
  }

  async getRoles(getRolesDto: GetRolesDto) {
    return this.queryBus.execute(new GetRolesQuery(getRolesDto));
  }
}
