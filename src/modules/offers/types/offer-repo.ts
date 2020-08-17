import { Offer } from '../domain';

export interface OfferRepo {
  getOfferByOfferId(offerId: string): Promise<Offer>;
  getAllOffers(): Promise<Offer[]>;
}
