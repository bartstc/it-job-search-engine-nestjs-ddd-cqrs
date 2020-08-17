import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { OfferDto } from '../../dtos';
import { OfferRepository } from '../../repositories';
import { OfferMap } from '../../mappers';

export type GetOffersResponse = Either<
  AppError.UnexpectedError,
  Result<OfferDto[]>
>;

export class GetOffersUseCase
  implements UseCase<undefined, Promise<GetOffersResponse>> {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute(): Promise<GetOffersResponse> {
    try {
      const offers = await this.offerRepository.getAllOffers();
      return right(Result.ok(OfferMap.toDtoBulk(offers)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
