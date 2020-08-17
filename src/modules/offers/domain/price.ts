import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { Currency } from './types';

interface PriceProps {
  priceMin: number;
  priceMax: number;
  currency: Currency;
}

export class Price extends ValueObject<PriceProps> {
  public static min = 0;
  public static max = 99999;

  get priceMin() {
    return this.props.priceMin;
  }

  get priceMax() {
    return this.props.priceMax;
  }

  get currency() {
    return this.props.currency;
  }

  private constructor(props: PriceProps) {
    super(props);
  }

  public static create(props: PriceProps): Result<Price> {
    const args = [
      { argument: props.priceMin, argumentPath: 'priceMin' },
      { argument: props.priceMax, argumentPath: 'priceMax' },
      { argument: props.currency, argumentPath: 'currency' },
    ];

    const nullGuard = Guard.againstNullOrUndefinedBulk(args);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const numberGuard = Guard.allIsNumber(args);
    if (!numberGuard.succeeded) {
      return Result.fail(numberGuard);
    }

    const rangeGuard = Guard.allInRange({
      min: this.min,
      max: this.max,
      args: [
        { argument: props.priceMin, argumentPath: 'priceMin' },
        { argument: props.priceMax, argumentPath: 'priceMax' },
      ],
    });
    if (!rangeGuard.succeeded) {
      return Result.fail(rangeGuard);
    }

    const currencyGuard = Guard.isOneOf({
      value: props.currency,
      validValues: Object.values(Currency),
      argumentPath: 'currency',
    });
    if (!currencyGuard.succeeded) {
      return Result.fail(currencyGuard);
    }

    return Result.ok(new Price(props));
  }
}
