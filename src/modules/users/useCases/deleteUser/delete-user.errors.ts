import { Result, UseCaseError } from 'shared/core';

export namespace DeleteUserErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `userNotFound`,
      });
    }
  }
}
