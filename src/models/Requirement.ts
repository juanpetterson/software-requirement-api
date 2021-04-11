import mongoose, { Schema, model } from 'mongoose';
import IRequirement from '../interfaces/requirement';
import logging from '../configs/logging';

const RequirementSchema = new Schema({
  type: String,
  code: String,
  requirement: String,
  description: String,
  observations: String,
  versioning: Number,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  createdAt: Date,
  updatedAt: Date,
});

RequirementSchema.post<IRequirement>('save', function () {
  logging.info('Mongo', 'Checkout the requirement we just saved: ', this);
});

export default model<IRequirement>('Requirements', RequirementSchema);
