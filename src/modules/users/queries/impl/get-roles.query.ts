import { Response } from 'express';
import { GetRolesDto } from '../../useCases/getRoles';

export class GetRolesQuery {
  constructor(
    public readonly getRolesDto: GetRolesDto,
    public readonly res: Response,
  ) {}
}
