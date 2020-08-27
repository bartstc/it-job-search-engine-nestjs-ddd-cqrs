import * as yup from 'yup';

import { CreateRoleDto } from './create-role.dto';

export const createRoleSchema = yup
  .object<CreateRoleDto>()
  .shape<CreateRoleDto>({
    permissions: yup.array<string>().required(),
    name: yup.string().required(),
    contextType: yup.string().required() as any,
  });
