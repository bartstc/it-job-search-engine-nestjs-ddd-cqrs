import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { GetOfferErrors } from './get-offer.errors';
import { OfferRepository } from '../../repositories';
import { Offer } from '../../domain';
import { OfferMap } from '../../mappers';
import { OfferDto } from '../../dtos';

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
