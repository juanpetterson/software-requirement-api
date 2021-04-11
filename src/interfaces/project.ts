import { Document } from 'mongoose';

export default interface IProject extends Document {
  _id?: string;
  name: String;
  area?: String;
  port?: String;
  targets?: String;
  observations?: Number;
  createdAt: Date;
  updatedAt: Date;
}
