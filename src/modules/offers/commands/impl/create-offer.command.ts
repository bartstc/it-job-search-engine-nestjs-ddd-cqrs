import { CreateOfferDto } from '../../useCases/createOffer';

export class CreateOfferCommand {
  constructor(public readonly createOfferDto: CreateOfferDto) {}
}
