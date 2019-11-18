import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export interface Channel extends Document {
  _id: string;
  idChannel: string;
  description: string;
  name: string;
  usersSubscribed: string[];
}


/*
export interface UserId extends Document {
  _id: string;
}*/
