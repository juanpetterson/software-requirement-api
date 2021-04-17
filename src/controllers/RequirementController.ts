import { Request, Response } from 'express';
import Requirement from '../models/Requirement';

const show = async (request: Request, response: Response) => {
  try {
    const { projectId } = request.query;

    const requirements = await Requirement.find({
      projectId: projectId?.toString(),
    }).sort('-versioning');

    return response.status(200).json(requirements);
  } catch (error) {
    console.log(error.trace);
  }
};

const getRequirementById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const requirements = await Requirement.findById(id);

    return response.status(200).json(requirements);
  } catch (error) {
    console.log(error.trace);
  }
};

const save = async (request: Request, response: Response) => {
  try {
    const {
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      complexity,
      priority,
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
      complexity,
      priority,
      projectId,
      createdAt,
      updatedAt: null,
    });

    await requirement.save();

    return response.status(200).json(requirement);
  } catch (error) {
    console.log(error.trace);
  }
};

const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const {
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      complexity,
      priority,
      projectId,
    } = request.body;

    const updatedAt = new Date();

    const existsRequirement = await Requirement.find({
      code,
      projectId,
      _id: { $ne: id },
    });

    if (existsRequirement.length > 0) {
      return response.status(409).json({
        message: 'Requirement code already exists in this project',
      });
    }
    const requirement = await Requirement.findByIdAndUpdate(id, {
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      complexity,
      priority,
      projectId,
      updatedAt,
    });

    return response.status(200).json(requirement);
  } catch (error) {
    console.log(error.trace);
  }
};

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    await Requirement.findByIdAndRemove(id);

    return response.sendStatus(200);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { getRequirementById, show, save, update, remove };
