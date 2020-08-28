import * as yup from 'yup';

import { CreateUserDto } from './index';
import { CtxType } from '../../../domain/types';

export const createUserSchema = yup
  .object<CreateUserDto>()
  .shape<CreateUserDto>({
    username: yup
      .string()
      .required()
      .min(2)
      .max(15),
    password: yup
      .string()
      .required()
      .min(6),
    email: yup
      .string()
      .required()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    roleIds: yup.array<string>().required(),
    contextType: yup
      .string()
      .required()
      .oneOf(Object.values(CtxType)),
  });
