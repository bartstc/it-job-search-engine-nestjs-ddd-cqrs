import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetOfferQuery, GetOffersQuery } from '../queries/impl';
import { CreateOfferCommand } from '../commands/impl';
import { CreateOfferDto } from '../useCases/createOffer';

@Injectable()
export class OfferService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto) {
    return await this.commandBus.execute(
      new CreateOfferCommand(createOfferDto),
    );
  }

  async getAllOffers() {
    return this.queryBus.execute(new GetOffersQuery());
  }

  async getOffer(offerId: string) {
    return this.queryBus.execute(new GetOfferQuery(offerId));
  }
}
