import { v4 } from 'uuid';

import {
  ContextType,
  User,
  UserEmail,
  UserName,
  UserPassword,
} from '../../domain';
import { CtxType } from '../../domain/types';
import { UserProps } from '../../domain/user';

export const mockPassword = UserPassword.create({ value: 'test123' });
export const mockEmail = UserEmail.create({ value: 'bob@bob.com' });
export const mockUsername = UserName.create({ value: 'bob' });
export const mockContextType = ContextType.create({ value: CtxType.Brand });

export const defaultProps: UserProps = {
  roleIds: [v4()],
  isEmailVerified: false,
  isDeleted: false,
  contextType: mockContextType. getValue(),
  password: mockPassword.getValue(),
  email: mockEmail.getValue(),
  username: mockUsername.getValue(),
};

export const defaultUser = User.create(defaultProps).getValue();
