import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import logger from "@/utils/logger";

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({ err, path: req.path, body: req.body }, err.message);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || {},
  });
};
