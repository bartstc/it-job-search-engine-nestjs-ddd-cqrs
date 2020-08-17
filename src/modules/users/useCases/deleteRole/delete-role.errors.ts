import { Result, UseCaseError } from 'shared/core';

export namespace DeleteRoleErrors {
  export class RoleNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `roleNotFound`,
      });
    }
  }
}
