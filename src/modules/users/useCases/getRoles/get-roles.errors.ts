import { Result, UseCaseError } from 'shared/core';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetRolesErrors {
  export class InvalidContextTypeError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Invalid context type`,
        signature: `invalidContextType`,
      });
    }
  }
}
