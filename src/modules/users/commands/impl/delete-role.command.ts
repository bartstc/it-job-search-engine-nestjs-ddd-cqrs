import { Response } from 'express';
import { DeleteRoleDto } from '../../useCases/deleteRole';

export class DeleteRoleCommand {
  constructor(
    public readonly deleteRoleDto: DeleteRoleDto,
    public readonly res: Response,
  ) {}
}
