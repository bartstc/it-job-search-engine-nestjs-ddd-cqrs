import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from '../entities';
import { OfferRepo } from '../types';
import { OfferMap } from '../mappers';
import { Offer } from '../domain';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity>
  implements OfferRepo {
  async exists(offerId: string): Promise<boolean> {
    const existingOffer = await this.createQueryBuilder('offer')
      .where('offer.offerId = :offerId', {
        offerId,
      })
      .getOne();

    return !!existingOffer;
  }

  async getOfferByOfferId(offerId: string) {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferMap.toDomain(offer);
  }

  async getAllOffers() {
    const offers = await this.find();
    return offers.map(offer => OfferMap.toDomain(offer));
  }

  async persist(offer: Offer): Promise<void> {
    const offerEntity = await OfferMap.toPersistence(offer);

    await this.create(offerEntity).save();
  }

  async deleteOffer(offer: Offer): Promise<void> {
    const offerId = offer.offerId.id.toString();

    const deleteResult = await this.delete({
      offer_id: offerId,
    });

    if (deleteResult.affected === 0)
      throw new Error(`Offer with id ${offerId} not found`);
  }
}
