import { CreateRoleDto } from '../../useCases/createRole';

export class CreateRoleCommand {
  constructor(public readonly createRoleDto: CreateRoleDto) {}
}
