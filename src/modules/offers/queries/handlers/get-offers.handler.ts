import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetOffersQuery } from '../impl';
import { GetOffersUseCase } from '../../useCases/getAllOffers';

@QueryHandler(GetOffersQuery)
export class GetOffersHandler implements IQueryHandler {
  constructor(private getRolesUseCase: GetOffersUseCase) {}

  async execute() {
    return await this.getRolesUseCase.execute();
  }
}
