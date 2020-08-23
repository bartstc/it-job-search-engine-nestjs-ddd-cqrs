import { Offer } from '../domain';

export interface OfferRepo {
  getOfferByOfferId(offerId: string): Promise<Offer>;
  getAllOffers(): Promise<Offer[]>;
  exists(offerId: string): Promise<boolean>;
  persist(offer: Offer): Promise<void>;
  deleteOffer(offer: Offer): Promise<void>;
}
