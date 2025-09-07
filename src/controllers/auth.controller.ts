import { loginDTO, signupDTO } from "../dto/auth.dto";
import { successResponse } from "../utils/response";
import * as userServices from "../services/user.services"
import { Controller } from "../types/expressRouteHandlerTypes";
import { isValidObjectId } from "mongoose";
import bcrypt from 'bcryptjs'
import { ApiError } from "../utils/ApiError";

export const signup: Controller = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body as signupDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);

    const user = await userServices.createUser({ name, email, password: hashedPassword, role });
    return successResponse(res, "User created successfully", user, 201);
  } catch (error) {
    return next(error);
  }
};

export const login: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body as loginDTO;
    const { user, token } = await userServices.login({ email, password });

    res.cookie("token", token);

    return successResponse(res, "Login successful", user, 200);
  } catch (error) {
    return next(error);
  }
};


export const getAllUser: Controller = async (req, res, next) => {
  try {
    const user = await userServices.getAllUser();
    return successResponse(res, "All user data fetched", user, 200)
  }
  catch (error) {
    return next(error)
  }
}

export const getUserById: Controller = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const validObjectId = isValidObjectId(userId)
    if (!validObjectId) throw new ApiError(422, "Invalid object id");
    const user = await userServices.getUserById(userId);
    return successResponse(res, "User found successfully", user, 200);
  } catch (error) {
    return next(error)
  }
}

export const updateUserDetails: Controller = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body;
    const validObjectId = isValidObjectId(userId)
    if (!validObjectId) throw new ApiError(422, "Invalid object Id");
    const user = await userServices.updateUserDetails(name, password, userId);
    return successResponse(res, "User details updated successfully", user, 200);
  } catch (error) {
    return next(error)
  }
}

export const deleteUser: Controller = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userServices.deleteUser(userId);
    if (user)
      return successResponse(res, "User deleted successfully", {}, 200);
  } catch (error) {
    return next(error)
  }
}