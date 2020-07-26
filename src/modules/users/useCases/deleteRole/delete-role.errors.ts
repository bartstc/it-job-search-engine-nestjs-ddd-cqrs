import { Result, UseCaseError } from 'shared/core';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeleteRoleErrors {
  export class RoleNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Role not found`,
      });
    }
  }
}
