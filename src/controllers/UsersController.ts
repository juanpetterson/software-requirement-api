import User from '@models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export interface RequestWIthUser extends Request {
  userId: string;
}

const me = async (request: RequestWIthUser, response: Response) => {
  try {
    const userList = await User.findById(request.userId);

    return response.status(200).json(userList);
  } catch (error) {
    console.log(error.trace);
  }
};

const show = async (request: Request, response: Response) => {
  try {
    const userList = await User.find();

    return response.status(200).json(userList);
  } catch (error) {
    console.log(error.trace);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.trace);
  }
};

const save = async (request: Request, response: Response) => {
  try {
    const { name, email, password, isAdmin } = request.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const createdAt = new Date();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      createdAt,
      updatedAt: null,
    });
    await user.save();

    return response.status(200).json(user);
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

    const user = await User.findById(id);
    if (user) {
      await user.update({
        name,
        password: hashedPassword,
        isAdmin,
        updatedAt,
      });

      return response.status(200).json(user);
    }

    return response.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.log(error.trace);
  }
};

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await User.findByIdAndRemove(id);

    return response.sendStatus(200);
  } catch (error) {
    console.log(error.trace);
  }
};

export default { me, getUserById, show, save, update, remove };
