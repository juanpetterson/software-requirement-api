import User from '@models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const show = async (request: Request, response: Response) => {
  try {
    const userList = await User.find();

    response.status(200).json(userList);
  } catch (error) {
    console.log(error.trace);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = User.findById(id);

    response.status(200).json(user);
  } catch (error) {
    console.log(error.trace);
  }
};

const save = async (request: Request, response: Response) => {
  try {
    const { name, email, password, isAdmin } = request.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const createdAt = new Date();
    const updatedAt = new Date();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      createdAt,
      updatedAt,
    });
    user.save();

    response.status(200).json(user);
  } catch (error) {
    console.log(error.trace);
  }
};

const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, password, isAdmin } = request.body;

    const updatedAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.findOneAndUpdate({
      _id: id,
      name,
      password: hashedPassword,
      isAdmin,
      updatedAt,
    });

    response.status(200).json(user);
  } catch (error) {
    console.log(error.trace);
  }
};

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await User.findByIdAndRemove(id);

    response.sendStatus(200);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { getUserById, show, save, update, remove };
