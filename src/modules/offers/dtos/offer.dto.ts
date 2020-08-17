import { Currency, EmploymentType, Level, Technology } from '../domain/types';

export class OfferDto {
  title: string;
  description: string;
  niceToHave: string[];
  mustHave: string[];
  level: Level;
  employmentType: EmploymentType;
  technology: Technology;
  address: {
    cityName: string;
    streetName: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  price: {
    priceMin: number;
    priceMax: number;
    currency: Currency;
  };
  createdAt: Date;
  updatedAt: Date;
}
