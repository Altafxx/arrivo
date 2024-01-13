export interface User {
    userID: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    membership: 'Premium' | 'Normal';
    createdAt: Date;
    updatedAt: Date;
}