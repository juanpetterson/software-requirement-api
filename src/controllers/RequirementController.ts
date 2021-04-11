import { Request, Response } from 'express';
import Requirement from '../models/Requirement';

const save = async (request: Request, response: Response) => {
  try {
    const {
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      projectId,
    } = request.body;

    const createdAt = new Date();

    const requirement = new Requirement({
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      projectId,
      createdAt,
      updatedAt: null,
    });

    console.log(requirement);

    await requirement.save();

    response.status(200).json(requirement);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { save };
