export interface LoginDTO {
    email: string;
    password: string;
}
export interface RegisterDTO {
    firstName: string;
    lastName:string;
    address: string;
    sex: string;
    email: string;
    password: string;
}
export interface UserRequestDTO {
    token: string;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        sex: string;
        isEmailValidated: boolean;
        address: string;
        phone: string;
        createdTime: Date;
        profilePicture: string;
        role: string;
    };
}
export interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    sex: string;
    isEmailValidated: boolean;
    address: string;
    phone: string;
    createdTime: Date;
    profilePicture: string;
    role: string;
}