import { Document } from 'mongoose';

export interface Channel extends Document {
  id: string;
  idChannel: string;
  description: string;
  name: string;
  messages: Message[];
}

export interface Message extends Document {
  id: string;
  idOfAuthor: string;
  content: string;
}
