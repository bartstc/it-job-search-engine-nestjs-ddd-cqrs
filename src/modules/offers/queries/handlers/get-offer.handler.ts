import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetOfferQuery } from '../impl';
import { GetOfferUseCase } from '../../useCases/getOffer';

@QueryHandler(GetOfferQuery)
export class GetOfferHandler implements IQueryHandler {
  constructor(private getOfferUseCase: GetOfferUseCase) {}

  async execute({ offerId }: GetOfferQuery) {
    return await this.getOfferUseCase.execute(offerId);
  }
}
