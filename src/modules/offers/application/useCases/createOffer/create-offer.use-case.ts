import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import {
  Description,
  Offer,
  Price,
  Skills,
  Title,
  Location,
  Address,
} from '../../../domain';
import { OfferRepository } from '../../../adapter';
import { CreateOfferDto } from './create-offer.dto';

export type CreateOfferResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Offer>
>;

@Injectable()
export class CreateOfferUseCase
  implements UseCase<CreateOfferDto, Promise<CreateOfferResponse>> {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute(dto: CreateOfferDto): Promise<CreateOfferResponse> {
    try {
      const titleOrError = Title.create({ value: dto.title });
      const descriptionOrError = Description.create({ value: dto.description });
      const mustHaveOrError = Skills.create({ value: dto.mustHave });
      const niceToHaveOrError = Skills.create({ value: dto.niceToHave });
      const priceOrError = Price.create({
        priceMin: dto.priceMin,
        priceMax: dto.priceMax,
        currency: dto.currency,
      });
      const locationOrError = Location.create({
        longitude: dto.longitude,
        latitude: dto.latitude,
      });
      const addressOrError = Address.create({
        location: locationOrError.getValue(),
        streetName: dto.streetName,
        cityName: dto.cityName,
      });

      const offerOrError = Offer.create({
        title: titleOrError.getValue(),
        description: descriptionOrError.getValue(),
        level: dto.level,
        technology: dto.technology,
        employmentType: dto.employmentType,
        niceToHave: niceToHaveOrError.getValue(),
        mustHave: mustHaveOrError.getValue(),
        price: priceOrError.getValue(),
        address: addressOrError.getValue(),
      });

      if (!offerOrError.isSuccess) {
        return left(Result.fail(offerOrError.error));
      }

      const offer = offerOrError.getValue();
      await this.offerRepository.persist(offer);
      return right(Result.ok(offer));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
