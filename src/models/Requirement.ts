import mongoose, { Schema, model } from 'mongoose';
import IRequirement from '../interfaces/requirement';
import logging from '../configs/logging';

const RequiredString = {
  type: String,
  required: true,
};

const RequirementSchema = new Schema({
  type: { ...RequiredString, enum: ['FUNCTIONAL', 'NOT_FUNCTIONAL'] },
  code: RequiredString,
  requirement: RequiredString,
  description: RequiredString,
  observations: String,
  versioning: Number,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: Date,
});

RequirementSchema.post<IRequirement>('save', function () {
  logging.info('Mongo', 'Checkout the requirement we just saved: ', this);
});

export default model<IRequirement>('Requirements', RequirementSchema);
