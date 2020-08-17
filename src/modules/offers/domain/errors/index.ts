import { IGuardResult } from 'shared/core/Guard';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OfferErrors {
  export class InvalidTechnologyError implements IGuardResult {
    succeeded = false;
    message;

    constructor(technology: string) {
      this.message = `${technology}.invalidTechnologyType`;
    }
  }

  export class InvalidEmploymentTypeError implements IGuardResult {
    succeeded = false;
    message;

    constructor(technology: string) {
      this.message = `${technology}.invalidEmploymentType`;
    }
  }

  export class InvalidLevelError implements IGuardResult {
    succeeded = false;
    message;

    constructor(level: string) {
      this.message = `${level}.invalidLevelType`;
    }
  }
}
