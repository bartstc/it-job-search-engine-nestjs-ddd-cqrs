import { GetRolesDto } from '../../useCases/getRoles';

export class GetRolesQuery {
  constructor(public readonly getRolesDto: GetRolesDto) {}
}
