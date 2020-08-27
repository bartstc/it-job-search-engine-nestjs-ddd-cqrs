import { Result, UseCaseError } from 'shared/core';

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `${email}.emailAlreadyInUse`,
      });
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `${username}.usernameAlreadyInUse`,
      });
    }
  }
}
