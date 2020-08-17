import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  public static minLength = 2;
  public static maxLength = 10000;

  get value() {
    return this.props.value;
  }

  private constructor(props: DescriptionProps) {
    super(props);
  }

  public static create(props: DescriptionProps): Result<Description> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'description',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'description',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'description',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new Description(props));
  }
}
