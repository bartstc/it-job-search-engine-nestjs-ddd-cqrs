import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { GetRolesQuery } from '../impl';
import { GetRolesUseCase } from '../../useCases/getRoles';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler extends BaseController
  implements IQueryHandler<GetRolesQuery> {
  constructor(private getRolesUseCase: GetRolesUseCase) {
    super();
  }

  logger = new Logger('GetRolesQuery');

  async execute({ getRolesDto }: GetRolesQuery) {
    return await this.getRolesUseCase.execute(getRolesDto);
  }
}
