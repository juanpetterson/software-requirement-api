import { Request, Response } from 'express';
import Project from '../models/Project';

const show = async (request: Request, response: Response) => {
  try {
    const projects = await Project.find();

    return response.status(200).json(projects);
  } catch (error) {
    console.log(error.trace);
  }
};

const find = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const projects = await Project.findById(id);

    return response.status(200).json(projects);
  } catch (error) {
    console.log(error.trace);
  }
};

const save = async (request: Request, response: Response) => {
  try {
    const { name, area, port, targets, observations } = request.body;

    const createdAt = new Date();

    const project = new Project({
      name,
      area,
      port,
      targets,
      observations,
      createdAt,
      updatedAt: null,
    });

    await project.save();

    return response.status(200).json(project);
  } catch (error) {
    console.log(error.trace);
  }
};

const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, area, port, targets, observations } = request.body;

    const updatedAt = new Date();

    const project = await Project.findByIdAndUpdate(id, {
      name,
      area,
      port,
      targets,
      observations,
      updatedAt,
    });

    return response.status(200).json(project);
  } catch (error) {
    console.log(error.trace);
  }
};

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    await Project.findByIdAndRemove(id);

    return response.sendStatus(200);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { show, find, save, update, remove };
