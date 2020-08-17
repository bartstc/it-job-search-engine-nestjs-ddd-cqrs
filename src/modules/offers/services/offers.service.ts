import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetOffersQuery } from '../queries/impl';

@Injectable()
export class OffersService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllOffers() {
    return this.queryBus.execute(new GetOffersQuery());
  }
}
