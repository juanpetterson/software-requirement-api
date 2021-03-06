import { Document } from 'mongoose';

export default interface IRequirement extends Document {
  _id?: string;
  type: 'FUNCTIONAL' | 'NOT_FUNCTIONAL';
  code: string;
  requirement: string;
  description: string;
  observations?: string;
  versioning: number;
  complexity: string;
  priority: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
