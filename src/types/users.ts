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

};
export type User = {
    name: string,
    image: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: string
}