import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { GetOfferErrors } from './get-offer.errors';
import { Offer } from '../../../domain';
import { OfferDto } from '../../dtos';
import { OfferMap, OfferRepository } from '../../../adapter';

export type GetOfferResponse = Either<
  GetOfferErrors.OfferDoesNotExistsError,
  Result<OfferDto>
>;

@Injectable()
export class GetOfferUseCase
  implements UseCase<string, Promise<GetOfferResponse>> {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute(offerId: string): Promise<GetOfferResponse> {
    let offer: Offer;

    try {
      try {
        offer = await this.offerRepository.getOfferByOfferId(offerId);
      } catch {
        return left(new GetOfferErrors.OfferDoesNotExistsError(offerId));
      }

      return right(Result.ok(OfferMap.toDto(offer)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
