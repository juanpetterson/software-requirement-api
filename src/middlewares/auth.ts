import jwt from "jsonwebtoken";
import authConfig from "../configs/auth";
import { promisify } from "util";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    await promisify(jwt.verify)(token, authConfig.secret);

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};

export default authMiddleware;
