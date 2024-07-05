export type IShippingAddress = {
    recipientName: string;
    recipientPhoneNumber: string;
    streetAddress: string;
    wardCommune: string;
    district: string;
    cityProvince: string;
    _id: string;
};

export type IUser = {
    id: string;
    name: string;
    email: string;
    image: string;
    phoneNumber: string;
    role: string;
    shippingAddress: IShippingAddress[];
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