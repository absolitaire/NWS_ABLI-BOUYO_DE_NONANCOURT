import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  entity: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^(\+\d{11})$/,
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  isManager: {
    type: Boolean,
    required: true,
  },
  manager: {
    type: String,
    trim: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
