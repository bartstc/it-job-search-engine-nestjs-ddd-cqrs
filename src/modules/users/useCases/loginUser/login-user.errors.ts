import { Result, UseCaseError } from 'shared/core';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoginUserErrors {
  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect`,
        signature: `wrongCredentialsProvided`,
      });
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect`,
        signature: `wrongCredentialsProvided`,
      });
    }
  }
}
