import { Schema, model } from 'mongoose';
import IProject from '../interfaces/project';
import logging from '../configs/logging';

const ProjectSchema = new Schema({
  name: String,
  area: String,
  port: String,
  targets: String,
  observations: Number,
  createdAt: Date,
  updatedAt: Date,
});

ProjectSchema.post<IProject>('save', function () {
  logging.info('Mongo', 'Checkout the project we just saved: ', this);
});

export default model<IProject>('Projects', ProjectSchema);
