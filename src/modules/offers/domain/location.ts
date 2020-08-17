import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface LocationProps {
  latitude: number;
  longitude: number;
}

export class Location extends ValueObject<LocationProps> {
  public static latitudeMin = -90;
  public static latitudeMax = 90;
  public static longitudeMin = -180;
  public static longitudeMax = 180;

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  private constructor(props: LocationProps) {
    super(props);
  }

  public static create(props: LocationProps): Result<Location> {
    const againstNullArgs = [
      { argument: props.longitude, argumentPath: 'longitude' },
      { argument: props.latitude, argumentPath: 'latitude' },
    ];

    const nullGuard = Guard.againstNullOrUndefinedBulk(againstNullArgs);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const numberGuard = Guard.allIsNumber(againstNullArgs);
    if (!numberGuard.succeeded) {
      return Result.fail(numberGuard);
    }

    const isRangeLongitudeGuard = Guard.inRange({
      num: props.longitude,
      min: this.longitudeMin,
      max: this.longitudeMax,
      argumentPath: 'longitude',
    });
    if (!isRangeLongitudeGuard.succeeded) {
      return Result.fail(isRangeLongitudeGuard);
    }

    const isRangeLatitudeGuard = Guard.inRange({
      num: props.latitude,
      min: this.latitudeMin,
      max: this.latitudeMax,
      argumentPath: 'latitude',
    });
    if (!isRangeLatitudeGuard.succeeded) {
      return Result.fail(isRangeLatitudeGuard);
    }

    return Result.ok(new Location(props));
  }
}
