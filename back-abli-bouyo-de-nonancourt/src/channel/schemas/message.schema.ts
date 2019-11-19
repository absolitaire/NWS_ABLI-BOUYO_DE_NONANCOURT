import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    maxlength: 99999,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  idChannel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
