import { Result, UseCaseError } from 'shared/core';

export namespace LoginUserErrors {
  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `usernameOrPasswordIncorrect`,
      });
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `usernameOrPasswordIncorrect`,
      });
    }
  }
}
