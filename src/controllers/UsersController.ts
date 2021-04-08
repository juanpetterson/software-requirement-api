import User from '@models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export interface RequestWIthUser extends Request {
  userId: string;
}

const me = async (request: RequestWIthUser, response: Response) => {
  try {
    const userList = await User.findById(request.userId);

    response.status(200).json(userList);
  } catch (error) {
    console.log(error.trace);
  }
};

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
    const user = await User.findById(id);
    console.log(user);

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
    await user.save();

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

    const user = await User.findById(id);
    if (user) {
      await user.update({
        name,
        password: hashedPassword,
        isAdmin,
        updatedAt,
      });

      response.status(200).json(user);
    }

    response.status(404).json({ message: 'User not found' });
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

export default { me, getUserById, show, save, update, remove };
