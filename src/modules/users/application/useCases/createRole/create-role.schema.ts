import * as yup from 'yup';

import { CreateRoleDto } from './create-role.dto';
import { CtxType } from '../../../domain/types';

export const createRoleSchema = yup
  .object<CreateRoleDto>()
  .shape<CreateRoleDto>({
    permissions: yup.array<string>().required(),
    name: yup
      .string()
      .required()
      .min(2)
      .max(50),
    contextType: yup
      .string()
      .required()
      .oneOf(Object.values(CtxType)),
  });
