import { ValueObject } from 'shared/domain';
import { Result } from 'shared/core';

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

  public static create({ value }: UserEmailProps): Result<UserEmail> {
    if (!this.isValidEmail(value)) {
      return Result.fail({
        message: `Email address ${value} not valid`,
        signature: 'emailNotValid',
      });
    } else {
      return Result.ok(new UserEmail({ value: this.format(value) }));
    }
  }
}
