import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { Currency, EmploymentType, Level, Technology } from '../domain/types';
const test = `INSERT INTO offers (offerId, title, description, companyName, technology, level, employmentType, cityName, streetName, priceMin, priceMax, currency, longitude, latitude)
            VALUES ('ace36259-eb62-4c1e-a0eb-75b7de29d012', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d013', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d014', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234')
        `
@Entity('offers')
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
