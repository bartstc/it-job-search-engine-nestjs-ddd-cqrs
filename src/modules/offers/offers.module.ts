import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryHandlers } from './application/queries/handlers';
import { CommandHandlers } from './application/commands/handlers';
import { OfferRepository } from './adapter';
import { OfferService } from './application/services';
import {
  GetOffersController,
  GetOffersUseCase,
} from './application/useCases/getAllOffers';
import {
  GetOfferController,
  GetOfferUseCase,
} from './application/useCases/getOffer';
import {
  CreateOfferController,
  CreateOfferUseCase,
} from './application/useCases/createOffer';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OfferRepository])],
  controllers: [GetOffersController, GetOfferController, CreateOfferController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    OfferService,
    GetOffersUseCase,
    GetOfferUseCase,
    CreateOfferUseCase,
  ],
})
export class OffersModule {}
