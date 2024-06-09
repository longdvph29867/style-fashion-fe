
export type AddUserType = {
    name: string;
    email: string;
    phoneNumber: string;
    image?: string;
}

export type UpdateUserTypeWithoutPassword = {
    name: string;
    email: string;
    phoneNumber: string;
    image?: string;
};