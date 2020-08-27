import * as yup from 'yup';
import { LoginUserDto } from './login-user.dto';

export const loginUserSchema = yup.object<LoginUserDto>().shape<LoginUserDto>({
  username: yup.string().required(),
  password: yup.string().required(),
});
