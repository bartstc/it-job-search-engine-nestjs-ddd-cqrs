import * as yup from 'yup';
import { CreateOfferDto } from './create-offer.dto';
import {
  Currency,
  EmploymentType,
  Level,
  Technology,
} from '../../domain/types';

export const createOfferSchema = yup
  .object<CreateOfferDto>()
  .shape<CreateOfferDto>({
    title: yup.string().required(),
    description: yup.string().required(),
    cityName: yup.string().required(),
    streetName: yup.string().required(),
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
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    currency: yup
      .string()
      .required()
      .oneOf(Object.values(Currency)),
    priceMin: yup.number().required(),
    priceMax: yup.number().required(),
    niceToHave: yup.array(),
    mustHave: yup.array(),
  });
