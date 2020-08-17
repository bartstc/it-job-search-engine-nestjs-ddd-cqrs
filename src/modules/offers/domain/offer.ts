import { Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';
import { IGuardArgument } from 'shared/core/Guard';

import { Title } from './title';
import { Description } from './description';
import { EmploymentType, Level, Technology } from './types';
import { Address } from './address';
import { Price } from './price';
import { Skills } from './skills';
import { OfferId } from './offer-id';
import { OfferErrors } from './errors';

import InvalidLevelError = OfferErrors.InvalidLevelError;
import InvalidTechnologyError = OfferErrors.InvalidTechnologyError;
import InvalidEmploymentTypeError = OfferErrors.InvalidEmploymentTypeError;

interface OfferProps {
  title: Title;
  description: Description;
  technology: Technology;
  level: Level;
  employmentType: EmploymentType;
  address: Address;
  price: Price;
  mustHave: Skills;
  niceToHave: Skills;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Offer extends Entity<OfferProps> {
  get offerId() {
    return OfferId.create(this._id).getValue();
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get technology() {
    return this.props.technology;
  }

  get level() {
    return this.props.level;
  }

  get employmentType() {
    return this.props.employmentType;
  }

  get address() {
    return this.props.address;
  }

  get price() {
    return this.props.price;
  }

  get mustHave() {
    return this.props.mustHave;
  }

  get niceToHave() {
    return this.props.niceToHave;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static isValidTechnology(rawTechnology: string) {
    return Object.values(Technology).includes(rawTechnology as Technology);
  }

  public static isValidLevel(rawLevel: string) {
    return Object.values(Level).includes(rawLevel as Level);
  }

  public static isValidEmploymentType(rawEmploymentType: string) {
    return Object.values(EmploymentType).includes(
      rawEmploymentType as EmploymentType,
    );
  }

  public static create(props: OfferProps, id?: UniqueEntityID): Result<Offer> {
    const args: IGuardArgument[] = [
      { argument: props.title, argumentPath: 'title' },
      { argument: props.description, argumentPath: 'description' },
      { argument: props.employmentType, argumentPath: 'employmentType' },
      { argument: props.level, argumentPath: 'level' },
      { argument: props.technology, argumentPath: 'technology' },
      { argument: props.address, argumentPath: 'address' },
      { argument: props.price, argumentPath: 'price' },
      { argument: props.mustHave, argumentPath: 'mustHave' },
      { argument: props.niceToHave, argumentPath: 'niceToHave' },
    ];

    const nullGuard = Guard.againstNullOrUndefinedBulk(args);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!this.isValidTechnology(props.technology)) {
      return Result.fail(new InvalidTechnologyError(props.technology));
    }

    if (!this.isValidLevel(props.level)) {
      return Result.fail(new InvalidLevelError(props.level));
    }

    if (!this.isValidEmploymentType(props.employmentType)) {
      return Result.fail(new InvalidEmploymentTypeError(props.employmentType));
    }

    return Result.ok(new Offer(props, id));
  }
}
