import { Response } from "express";
export const successResponse = (
  res: Response,
  message: string,
  data: unknown = {},
  statusCode: number = 200
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (
  res: Response,
  message: string,
  errors: unknown = {},
  statusCode: number
) => {
  return res.status(statusCode).json({ success: false, message, errors });
};
