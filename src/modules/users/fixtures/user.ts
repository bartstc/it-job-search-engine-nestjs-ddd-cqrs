import { v4 } from 'uuid';

import { User, UserEmail, UserName, UserPassword } from '../domain';
import { ContextType } from '../domain/types';
import { UserProps } from '../domain/user';

export const mockPassword = UserPassword.create({ value: 'test123' });
export const mockEmail = UserEmail.create({ value: 'bob@bob.com' });
export const mockUsername = UserName.create({ value: 'bob' });

export const defaultProps: UserProps = {
  roleIds: [v4()],
  isEmailVerified: false,
  contextType: ContextType.Brand,
  isDeleted: false,
  password: mockPassword.getValue(),
  email: mockEmail.getValue(),
  username: mockUsername.getValue(),
};

export const defaultUser = User.create(defaultProps).getValue();
