export type IUser = {
    name: string;
    email: string;
    image: string;
    phoneNumber: string;
    role: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
}

export type AddUserType = {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

export type UpdateUserTypeWithoutPassword = Omit<AddUserType, 'password'>;

export type Role = 'admin' | 'user';