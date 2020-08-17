import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferRepository } from './repositories';
import { GetOffersController, GetOffersUseCase } from './useCases/getAllOffers';
import { QueryHandlers } from './queries/handlers';
import { OffersService } from './services';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OfferRepository])],
  controllers: [GetOffersController],
  providers: [...QueryHandlers, OffersService, GetOffersUseCase],
})
export class OffersModule {}
