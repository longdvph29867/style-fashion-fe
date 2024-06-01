export type IUser = {
    id: string;
    name: string;
    email: string;
    image: string;
    phoneNumber: string;
    role: string;
    shippingAddress: string[];
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