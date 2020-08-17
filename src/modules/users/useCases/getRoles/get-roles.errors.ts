import { Result, UseCaseError } from 'shared/core';

export namespace GetRolesErrors {
  export class InvalidContextTypeError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `invalidContextType`,
      });
    }
  }
}
