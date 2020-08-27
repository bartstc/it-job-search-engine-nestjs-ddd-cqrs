import * as yup from 'yup';

import { CreateUserDto } from './index';

export const createUserSchema = yup
  .object<CreateUserDto>()
  .shape<CreateUserDto>({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required(),
    roleIds: yup.array<string>().required(),
    contextType: yup.string().required() as any,
  });
