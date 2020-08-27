import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { Currency, EmploymentType, Level, Technology } from '../../domain/types';

@Entity('offers')
export class OfferEntity extends AbstractEntity {
  @PrimaryColumn()
  offer_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  technology: Technology;

  @Column()
  level: Level;

  @Column()
  employment_type: EmploymentType;

  @Column()
  city_name: string;

  @Column()
  street_name: string;

  @Column()
  price_min: number;

  @Column()
  price_max: number;

  @Column()
  currency: Currency;

  @Column('decimal')
  longitude: number;

  @Column('decimal')
  latitude: number;

  @Column('text', { array: true })
  must_have: string[];

  @Column('text', { array: true })
  nice_to_have: string[];
}
