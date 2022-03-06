import { RoleEnum } from '@/enums/RoleEnum';

export type RoleType =
  | undefined
  | RoleEnum.All
  | RoleEnum.ADMIN
  | RoleEnum.USER;

export interface UserState {
  userName: string;
  password: string;
  nickName: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  identityCard?: string;
  avatar?: string;
  note?: string;
  createTime?: string;
  updateTime?: string;
  loginTime?: string;
  role: RoleType;
}
