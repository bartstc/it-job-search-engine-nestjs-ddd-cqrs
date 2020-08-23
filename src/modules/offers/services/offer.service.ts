import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetOfferQuery, GetOffersQuery } from '../queries/impl';

@Injectable()
export class OfferService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllOffers() {
    return this.queryBus.execute(new GetOffersQuery());
  }

  async getOffer(offerId: string) {
    return this.queryBus.execute(new GetOfferQuery(offerId));
  }
}
