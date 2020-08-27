import { Mapper } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import {
  Offer,
  Price,
  Skills,
  Title,
  Description,
  Address,
  Location,
} from '../../domain';
import { OfferDto } from '../../application/dtos';
import { OfferEntity } from '../../infra/entities';

export class OfferMap implements Mapper<Offer> {
  public static toDtoBulk(offers: Offer[]): OfferDto[] {
    return offers.map(offer => this.toDto(offer));
  }

  public static toDto(offer: Offer): OfferDto {
    return {
      offerId: offer.offerId.id.toString(),
      title: offer.title.value,
      description: offer.description.value,
      mustHave: offer.mustHave.value,
      niceToHave: offer.niceToHave.value,
      employmentType: offer.employmentType,
      technology: offer.technology,
      level: offer.level,
      address: {
        cityName: offer.address.cityName,
        streetName: offer.address.streetName,
        location: {
          latitude: offer.address.location.latitude,
          longitude: offer.address.location.longitude,
        },
      },
      price: {
        priceMin: offer.price.priceMin,
        priceMax: offer.price.priceMax,
        currency: offer.price.currency,
      },
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    };
  }

  public static toDomain(entity: OfferEntity): Offer {
    const titleOrError = Title.create({ value: entity.title });
    const descriptionOrError = Description.create({
      value: entity.description,
    });
    const priceOrError = Price.create({
      priceMin: entity.price_min,
      priceMax: entity.price_max,
      currency: entity.currency,
    });
    const mustHaveOrError = Skills.create({ value: entity.must_have });
    const niceToHaveOrError = Skills.create({ value: entity.nice_to_have });
    const locationOrError = Location.create({
      latitude: entity.latitude * 1,
      longitude: entity.longitude * 1,
    });

    const addressOrError = Address.create({
      cityName: entity.city_name,
      streetName: entity.street_name,
      location: locationOrError.getValue(),
    });

    const offerOrError = Offer.create(
      {
        title: titleOrError.getValue(),
        description: descriptionOrError.getValue(),
        mustHave: mustHaveOrError.getValue(),
        niceToHave: niceToHaveOrError.getValue(),
        price: priceOrError.getValue(),
        address: addressOrError.getValue(),
        employmentType: entity.employment_type,
        technology: entity.technology,
        level: entity.level,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      new UniqueEntityID(entity.offer_id),
    );

    !offerOrError.isSuccess ? console.log(offerOrError.error) : '';
    return offerOrError.getValue();
  }

  public static toPersistence(offer: Offer): Partial<OfferEntity> {
    return {
      offer_id: offer.offerId.id.toString(),
      title: offer.title.value,
      description: offer.description.value,
      nice_to_have: offer.niceToHave.value,
      must_have: offer.mustHave.value,
      employment_type: offer.employmentType,
      technology: offer.technology,
      level: offer.level,
      street_name: offer.address.streetName,
      city_name: offer.address.cityName,
      longitude: offer.address.location.longitude,
      latitude: offer.address.location.latitude,
      price_min: offer.price.priceMin,
      price_max: offer.price.priceMax,
      currency: offer.price.currency,
    };
  }
}
