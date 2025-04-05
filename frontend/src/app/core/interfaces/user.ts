export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture?: string;
    bio?: string;
    role?: string;
    created_at?: number;
    updated_at?: number;
}
