import { IBaseUser } from './base-user';

export interface IUser extends IBaseUser {
  name: string;
  lastName: string;
  confirmPassword: string;
  publicKey: string | undefined;
  secretKey: string | undefined;
}
