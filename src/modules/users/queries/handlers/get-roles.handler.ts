import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetRolesQuery } from '../impl';
import { GetRolesUseCase } from '../../useCases/getRoles';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private getRolesUseCase: GetRolesUseCase) {}

  async execute({ getRolesDto }: GetRolesQuery) {
    return await this.getRolesUseCase.execute(getRolesDto);
  }
}
