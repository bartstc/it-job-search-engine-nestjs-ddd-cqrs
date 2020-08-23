import {
  Currency,
  EmploymentType,
  Level,
  Technology,
} from '../../domain/types';

export interface CreateOfferDto {
  title: string;
  description: string;
  technology: Technology;
  level: Level;
  employmentType: EmploymentType;
  cityName: string;
  streetName: string;
  latitude: number;
  longitude: number;
  priceMin: number;
  priceMax: number;
  currency: Currency;
  mustHave: string[];
  niceToHave: string[];
}
