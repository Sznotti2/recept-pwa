export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    bio?: string;
    role?: string;
    createdAt?: number;
    updatedAt?: number;
}
