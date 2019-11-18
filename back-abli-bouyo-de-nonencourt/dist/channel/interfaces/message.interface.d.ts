import { Document } from "mongoose";
export interface Message extends Document {
    _id: string;
    idUser: string;
    content: string;
    idChannel: string;
}
