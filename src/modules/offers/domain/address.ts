import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { Location } from './location';

interface AddressProps {
  cityName: string;
  streetName: string;
  location: Location;
}

export class Address extends ValueObject<AddressProps> {
  public static minLength = 2;
  public static maxLength = 50;

  get cityName() {
    return this.props.cityName;
  }

  get streetName() {
    return this.props.streetName;
  }

  get location() {
    return this.props.location;
  }

  private constructor(props: AddressProps) {
    super(props);
  }

  public static create(props: AddressProps): Result<Address> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.cityName, argumentPath: 'cityName' },
      { argument: props.streetName, argumentPath: 'streetName' },
    ]);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const minGuard = Guard.allAtLeast(this.minLength, [
      {
        argument: props.streetName,
        argumentPath: 'streetName',
      },
      {
        argument: props.cityName,
        argumentPath: 'cityName',
      },
    ]);
    if (!minGuard.succeeded) {
      return Result.fail(minGuard);
    }

    const maxGuard = Guard.allAtMost(this.maxLength, [
      {
        argument: props.streetName,
        argumentPath: 'streetName',
      },
      {
        argument: props.cityName,
        argumentPath: 'cityName',
      },
    ]);
    if (!maxGuard.succeeded) {
      return Result.fail(maxGuard);
    }

    return Result.ok(new Address(props));
  }
}
