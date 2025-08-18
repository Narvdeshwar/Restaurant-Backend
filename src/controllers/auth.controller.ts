import mongoose from "mongoose";
import User, { IUser } from "../models/user.models";
import { NextFunction, Request, Response } from "express";
import { loginDTO, signupDTO } from "../dto/auth.dto";
import { ApiError } from "../utils/ApiError";
import { successResponse } from "../utils/response";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body as signupDTO;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError(409, "Email already registered!"));
    }
    // create: its create new user and save the data
    const user = await User.create({ name, email, password, role });
    return successResponse(res, "User created successfully", user, 201);
  } catch (error) {
    return next(new ApiError(500, "User not created", error));
  }
};
