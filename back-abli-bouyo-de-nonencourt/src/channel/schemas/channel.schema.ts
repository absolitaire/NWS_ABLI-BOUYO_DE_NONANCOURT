import * as mongoose from 'mongoose';
import { Message } from '../interfaces/channel.interface';
import { Schema } from 'mongoose';

export const ChannelSchema = new mongoose.Schema({
idChannel: {
  type: String,
  required: true,
  minlength: 1,
  maxlength: 5,
  trim: true,
},
description: {
  type: String,
    maxlength: 200,
},
name: {
  type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true,
},
  usersSubscribed: [{
     type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
export const UserIdSchema = new mongoose.Schema({
/*  _id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    trim: true,
  },*/
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
