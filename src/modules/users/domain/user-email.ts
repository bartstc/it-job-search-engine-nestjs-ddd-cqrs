import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

export interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  // todo: handle error via Either monad: EmailInvalidError
  public static create({ value }: UserEmailProps): Result<UserEmail> {
    const emailResult = Guard.againstNullOrUndefined(value, 'email');
    if (!emailResult.succeeded) {
      return Result.fail(emailResult);
    }

    if (!this.isValidEmail(value)) {
      return Result.fail({
        message: `email.isInvalid`,
      });
    } else {
      return Result.ok(new UserEmail({ value: this.format(value) }));
    }
  }
}
