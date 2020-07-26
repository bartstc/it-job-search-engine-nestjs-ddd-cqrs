import { Result, UseCaseError } from 'shared/core';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeleteUserErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      });
    }
  }
}
