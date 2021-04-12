import { Schema, model } from 'mongoose';
import IUser from '../interfaces/user';
import logging from '../configs/logging';

const RequiredString = {
  type: String,
  required: true,
};

const UserSchema = new Schema({
  name: RequiredString,
  email: RequiredString,
  password: RequiredString,
  isAdmin: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

UserSchema.post<IUser>('save', function () {
  logging.info('Mongo', 'Checkout the user we just saved: ', this);
});

export default model<IUser>('Users', UserSchema);
