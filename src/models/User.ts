import { Schema, model } from 'mongoose';
import IUser from '../interfaces/user';
import logging from '../configs/logging';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

UserSchema.post<IUser>('save', function () {
  logging.info('Mongo', 'Checkout the user we just saved: ', this);
});

export default model<IUser>('Users', UserSchema);
