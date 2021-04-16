import User from '@models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import authConfig from '../configs/auth';

const authenticate = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        return response.status(200).json({
          user,
          token: jwt.sign({ id: user._id }, authConfig.secret as Secret),
        });
      }
    }

    return response.status(401).json({ message: 'User not found' });
  } catch (error) {
    console.log(error.trace);
  }
};

export default { authenticate };
