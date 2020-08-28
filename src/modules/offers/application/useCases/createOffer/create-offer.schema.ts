import * as yup from 'yup';
import { CreateOfferDto } from './create-offer.dto';
import {
  Currency,
  EmploymentType,
  Level,
  Technology,
} from '../../../domain/types';

export const createOfferSchema = yup
  .object<CreateOfferDto>()
  .shape<CreateOfferDto>({
    title: yup
      .string()
      .required()
      .min(2)
      .max(85),
    description: yup
      .string()
      .required()
      .min(2)
      .max(10000),
    cityName: yup
      .string()
      .required()
      .min(2)
      .max(50),
    streetName: yup
      .string()
      .required()
      .min(2)
      .max(50),
    level: yup
      .string()
      .required()
      .oneOf(Object.values(Level)),
    technology: yup
      .string()
      .required()
      .oneOf(Object.values(Technology)),
    employmentType: yup
      .string()
      .required()
      .oneOf(Object.values(EmploymentType)),
    latitude: yup
      .number()
      .required()
      .min(-90)
      .max(90),
    longitude: yup
      .number()
      .required()
      .min(-180)
      .max(180),
    currency: yup
      .string()
      .required()
      .oneOf(Object.values(Currency)),
    priceMin: yup
      .number()
      .required()
      .min(0)
      .max(99999),
    priceMax: yup
      .number()
      .required()
      .min(0)
      .max(99999),
    niceToHave: yup.array(),
    mustHave: yup.array(),
  });
