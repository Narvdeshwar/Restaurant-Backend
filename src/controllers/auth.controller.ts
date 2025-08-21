import { NextFunction, Request, Response } from "express";
import { signupDTO } from "../dto/auth.dto";
import { successResponse } from "../utils/response";
import * as userServices from "../services/user.services"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body as signupDTO;
    const user = await userServices.createUser({ name, email, password, role })
    return successResponse(res, "User created successfully", user, 201);
  } catch (error) {
    return next(error)
  }
};
