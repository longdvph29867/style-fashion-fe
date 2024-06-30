export type RegisterType = {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  rePassword?: string;
};
export type ObjString = { [key: string]: string }

export type LoginType = Pick<RegisterType, 'email' | 'password'>;

export type InforUserType = {
  name: string,
  email: string,
  role: string,
  isEmailVerified: boolean,
  active: boolean,
  id: string
}

export type UserTokenType = {
  access: {
    token: string,
    expires: string
  },
  refresh: {
    token: string,
    expires: string,
  }
}