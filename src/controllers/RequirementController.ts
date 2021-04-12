import { Request, Response } from 'express';
import Requirement from '../models/Requirement';

const show = async (request: Request, response: Response) => {
  try {
    const requirements = await Requirement.find();

    response.status(200).json(requirements);
  } catch (error) {
    console.log(error.trace);
  }
};

const find = async (request: Request, response: Response) => {
  try {
    const { projectId } = request.query;
    const findFields = { projectId: projectId?.toString() };

    console.log('projectId', projectId);

    // pegar ultima versão do código de requisito

    const requirements = await Requirement.find(findFields).sort('-versioning');

    response.status(200).json(requirements);
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
      projectId,
    } = request.body;

    const createdAt = new Date();

    const existsRequirement = await Requirement.find({ code, projectId });

    if (existsRequirement) {
      response.status(409).json({
        message: 'Requirement code already exists in this project',
      });
    }

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

    await requirement.save();

    response.status(200).json(requirement);
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
    } = request.body;

    const updatedAt = new Date();

    const requirement = await Requirement.findByIdAndUpdate(id, {
      type,
      code,
      requirement: requirementInfo,
      description,
      observations,
      versioning,
      updatedAt,
    });

    response.status(200).json(requirement);
  } catch (error) {
    console.log(error.trace);
  }
};

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    await Requirement.findByIdAndRemove(id);

    response.sendStatus(200);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { show, find, save, update, remove };
