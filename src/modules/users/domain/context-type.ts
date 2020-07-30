import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { CtxType } from './types';

interface ContextTypeProps {
  value: CtxType;
}

export class ContextType extends ValueObject<ContextTypeProps> {
  get value(): CtxType {
    return this.props.value;
  }

  private constructor(props: ContextTypeProps) {
    super(props);
  }

  static contextTypeIsValid(value: any) {
    return Object.values(CtxType).some(type => type === value);
  }

  public static create(props: ContextTypeProps): Result<ContextType> {
    const contextTypeResult = Guard.againstNullOrUndefined(
      props.value,
      'contextType',
    );
    if (!contextTypeResult.succeeded) {
      return Result.fail<ContextType>(contextTypeResult);
    }

    if (!this.contextTypeIsValid(props.value)) {
      return Result.fail({
        message: 'contextType.invalidCtxType',
      });
    }

    return Result.ok(new ContextType(props));
  }
}
