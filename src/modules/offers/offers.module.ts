import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryHandlers } from './queries/handlers';
import { OfferRepository } from './repositories';
import { OfferService } from './services';
import { GetOffersController, GetOffersUseCase } from './useCases/getAllOffers';
import { GetOfferController, GetOfferUseCase } from './useCases/getOffer';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OfferRepository])],
  controllers: [GetOffersController, GetOfferController],
  providers: [
    ...QueryHandlers,
    OfferService,
    GetOffersUseCase,
    GetOfferUseCase,
  ],
})
export class OffersModule {}
