import { Result, UseCaseError } from 'shared/core';

export namespace GetOfferErrors {
  export class OfferDoesNotExistsError extends Result<UseCaseError> {
    constructor(offerId: string) {
      super(false, {
        message: `Offer with id ${offerId} does not exists`,
      });
    }
  }
}
