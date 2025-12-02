export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    role: 'admin' | 'user';
    createdAt: Date;
}
