import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOfferCommand } from '../impl';
import { CreateOfferUseCase } from '../../useCases/createOffer';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(private createOfferUseCase: CreateOfferUseCase) {}

  async execute({ createOfferDto }: CreateOfferCommand) {
    return await this.createOfferUseCase.execute(createOfferDto);
  }
}
