import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { Currency, EmploymentType, Level, Technology } from '../domain/types';

@Entity('offer')
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  companyName: string;

  @Column()
  technology: Technology;

  @Column()
  level: Level;

  @Column()
  employmentType: EmploymentType;

  @Column()
  cityName: string;

  @Column()
  streetName: string;

  @Column()
  priceMin: number;

  @Column()
  priceMax: number;

  @Column()
  currency: Currency;

  @Column('decimal')
  longitude: number;

  @Column('decimal')
  latitude: number;

  @Column('text', { array: true })
  mustHave: string[];

  @Column('text', { array: true })
  niceToHave: string[];
}
