import { loginDTO, signupDTO } from "../dto/auth.dto";
import { successResponse } from "../utils/response";
import * as userServices from "../services/user.services"
import { Controller } from "../types/expressRouteHandlerTypes";
import User from "../models/user.models";
import { idValidator } from "../utils/idValidator";
console.log("testing")

export const signup: Controller = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body as signupDTO;
    const user = await userServices.createUser({ name, email, password, role });
    return successResponse(res, "User created successfully", user, 201);
  } catch (error) {
    return next(error);
  }
};

export const login: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body as loginDTO;
    const user = await userServices.login({ email, password });
    return successResponse(res, "Login successfull", 200)
  } catch (error) {
    return next(error)
  }
}

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
    idValidator(userId)
    const user = await userServices.getUserById(userId);
    return successResponse(res, "User found successfully", user, 200);
  } catch (error) {
    return next(error)
  }
}

export const updateUserDetail: Controller = async (req, res, next) => {
  try {
    console.log("is code reaching here");
    const userId = req.params.id;
    console.log("User is", userId)

    const user = await userServices.updateUserDetail();
  } catch (error) {

  }
}