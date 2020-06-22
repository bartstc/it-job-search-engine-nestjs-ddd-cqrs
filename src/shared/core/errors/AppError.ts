import { UnknownError } from './UnknownError';
import { ResultError } from './ResultError';
import { Result } from '../Result';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppError {
  export class UnexpectedError extends Result<UnknownError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        signature: `unexpectedError`,
        error: err,
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class ValidationError extends Result<ResultError> {
    constructor({ message, signature }: ResultError) {
      super(false, {
        message,
        signature: signature || 'unknownValidationError',
      });
    }
  }
}
