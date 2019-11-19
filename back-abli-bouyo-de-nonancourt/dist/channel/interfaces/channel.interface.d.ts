import { Document } from 'mongoose';
export interface Channel extends Document {
    _id: string;
    idChannel: string;
    description: string;
    name: string;
    usersSubscribed: string[];
}
