import { Document } from 'mongoose';
export interface User extends Document {
    id: string;
    login: string;
    password: string;
    email: string;
}
