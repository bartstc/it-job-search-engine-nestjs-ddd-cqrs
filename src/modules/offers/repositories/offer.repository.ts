import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from '../entities';
import { OfferRepo } from '../types';
import { OfferMap } from '../mappers';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity>
  implements OfferRepo {
  async getOfferByOfferId(offerId: string) {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferMap.toDomain(offer);
  }

  async getAllOffers() {
    const offers = await this.find();
    console.log(offers)
    return offers.map(offer => OfferMap.toDomain(offer));
  }
}
